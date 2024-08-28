import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MerchProps } from "store-context";
import { Button, Hero, Loading, MerchCard } from "nexious-library";
import { formatPenniesToDollars } from "@app/formatPenniesToDollars";
import { StoreContext } from "@context/store/StoreContext";
import { AuthContext } from "@context/auth/AuthContext";
import ViewComments from "@components/app/ViewComments";

const MerchPage = () => {
  const { accessToken } = useContext(AuthContext);
  const { inventory, store } = useContext(AppContext);
  const { cart, addToCart, updateCart, postReview } = useContext(StoreContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [merch, setMerch] = useState<MerchProps>();
  const storeIdx = cart.findIndex((c) => c.storeId === store.storeId);

  useEffect(() => {
    // fetch app data
    const merchId = pathname.split("/")[3];
    if (merchId) {
      const merchIdx = inventory.findIndex((i) => i.merchId === merchId);
      if (merchIdx >= 0) setMerch(inventory[merchIdx]);
      else navigate(`/store/${store.storeLink}`);
    } else navigate(`/store/${store.storeLink}`);
  }, [pathname]);

  if (!merch) return <Loading />;
  const canRemove = storeIdx >= 0 && cart[storeIdx].merch.some((c: MerchProps) => c.merchId === merch.merchId);
  const handleRemove = (item: MerchProps) => {
    // avoid mutating values
    const oldValues = [...cart];
    const removedMerch = oldValues[storeIdx].merch.filter((m) => m.merchId !== item.merchId);
    // if removed merch was the last item in cart remove store from cart
    if (removedMerch.length === 0) {
      const removedStore = oldValues.filter((val) => val.storeId !== store.storeId);
      updateCart(removedStore);
    } else {
      // otherwise remove merch item
      oldValues[storeIdx].merch = removedMerch;
      // update cart
      updateCart(oldValues);
    }
  };
  console.log("merch :>> ", merch);
  return (
    <div className="primary-container">
      {merch.name && <h2 className="heading">{merch.name}</h2>}
      {merch.thumbnail && <Hero hero={{ url: merch.thumbnail || merch.hero, alt: merch.name }} theme="thumbnail" />}
      <MerchCard hideButtons key={merch.uid} theme="merch-page" data={{ ...merch, cost: formatPenniesToDollars(merch.cost) }} />
      <div className="merch-actions">
        {canRemove ? (
          <Button label="- Remove from to cart" onClick={() => handleRemove(merch)} />
        ) : (
          <Button label="+ Add to cart" onClick={() => addToCart(cart, store, { ...merch, quantity: 1 })} />
        )}
      </div>
      <h2 className="heading">Reviews:</h2>
      <ViewComments
        key={merch.uid}
        comments={merch.reviews}
        allowRating
        // activeMessage={activeMessage}
        onLikeMessage={(m) => console.log("m :>> ", m)}
        reply={(val) => console.log("val :>> ", val)}
      />
    </div>
  );
};
export default MerchPage;
