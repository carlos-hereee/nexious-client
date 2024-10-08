import { useContext, useEffect, useState } from "react";
import { Button, Loading, PaymentMethods, Total } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "@context/store/StoreContext";
import { CartProps, MerchProps, PaymentMethod } from "store-context";
import { formatTotal } from "@app/formatPenniesToDollars";
import { paymentMethods } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import UserInformation from "@components/form/UserInformation";
import CartList from "@components/list/CartList";
import { scrollToId } from "@app/scrollToElement";
import EmptyContainer from "@components/containers/EmptyContainer";

type Menu = "All" | "Online" | "In store";

const Checkout = () => {
  const { cart, onCheckOutSession, onStoreCheckout, error, isLoading, setLoading, order } = useContext(StoreContext);
  const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [storeIdx, setStore] = useState(0);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState<CartProps>();
  const [paymentTypes, setPaymentTypes] = useState(paymentMethods);
  const [activeNav, setActiveNav] = useState<Menu>("All");
  const [merch, setMerch] = useState<MerchProps[]>([]);
  const [navigation, setNavigation] = useState<Menu[]>(["Online", "In store"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.length > 0) {
      // require user details
      if (!user.email && !user.phone && !user.name) setShow(true);
      let methods = [...paymentMethods];
      // if stripe is not active remove as option
      if (!cart[storeIdx].isStripeActive) {
        methods = methods.filter((method) => method.type !== "visa/credit");
        setNavigation(["In store"]);
      }
      // handle other store limitations
      const someInStore = cart[storeIdx].merch.some((m) => !m.productId);
      const someOnline = cart[storeIdx].merch.some((m) => m.productId);
      if (!someOnline && someInStore) {
        methods = methods.filter((method) => method.type !== "visa/credit");
        setActiveNav("In store");
        setNavigation(["In store"]);
      }
      if (someOnline && !someInStore) setNavigation(["Online"]);
      if (someOnline && someInStore) setNavigation(["Online", "In store"]);
      // set active store
      setActive(cart[storeIdx]);
      // update payment method types
      setPaymentTypes(methods);
    }
  }, [storeIdx]);

  useEffect(() => {
    if (storeIdx >= 0 && active) {
      if (activeNav === "Online") {
        const filteredMerch = active.merch.filter((m) => m.productId);
        setMerch(filteredMerch);
      }
      if (activeNav === "In store") {
        const filteredMerch = active.merch.filter((m) => !m.productId);
        setMerch(filteredMerch);
      }
      if (activeNav === "All") {
        setMerch(active.merch);
        setTotal(formatTotal(active.merch));
      }
    }
    // update merch data when cart is update or menu is toggled
  }, [activeNav, active]);
  useEffect(() => {
    if (merch && merch.length > 0) setTotal(formatTotal(merch));
  }, [merch, cart]);
  useEffect(() => {
    if (show) {
      if (navigation.length > 1) setActiveNav(navigation[0]);
      setTotal(formatTotal(merch));
    }
  }, [show]);

  useEffect(() => {
    if (error) {
      scrollToId("client-information", "start");
      setLoading(false);
    }
    // if order was confirmed navigate to checkout success
    if (order?.store.storeId) navigate("/checkout/success");
  }, [error, isLoading, order]);

  // no items in cart
  if (!cart || cart.length === 0) {
    return <EmptyContainer heading="Your cart its empty" to={{ label: "Explore apps", location: "/explore" }} />;
  }
  // set loading screen if no store is active
  if (!active) return <Loading />;

  const handlePaymentClick = (data?: PaymentMethod) => {
    // TODO: add shipping options
    if (!data) {
      if (activeNav === "In store") onStoreCheckout({ sessionCart: active, user });
      if (activeNav === "Online") onCheckOutSession({ sessionCart: active, user });
    } else {
      if (data.type === "store") onStoreCheckout({ sessionCart: active, user });
      if (data.type === "visa/credit") onCheckOutSession({ sessionCart: active, user });
    }
  };
  // TODO: ADD SHIPPING DETAILS
  return (
    <section className="split-container">
      <div className="container">
        <h1 className="heading">Checkout: {active.storeName}</h1>
        {cart.length > 1 && (
          <div className="buttons-navigation">
            {cart.map((c, idx) => (
              <Button
                label={c.storeName}
                key={c.storeId}
                theme={c.storeId === active.storeId ? "btn-main btn-active" : "btn-main"}
                onClick={() => setStore(idx)}
              />
            ))}
          </div>
        )}
        <CartList active={active} storeIdx={storeIdx} merch={active.merch} />
      </div>
      <div className="container">
        <UserInformation errorMessage={error} user={user} setShow={(s) => setShow(s)} show={show} />
        {activeNav === "All" && <Total total={total} heading="Total:" />}
        {!show && (
          <>
            {activeNav !== "All" && (
              <>
                {navigation.length > 1 && (
                  <CartList
                    active={active}
                    navigation={navigation}
                    storeIdx={storeIdx}
                    merch={merch}
                    setActiveNav={(nav) => setActiveNav(nav)}
                    activeNav={activeNav}
                  />
                )}
                <Total total={total} heading="Total:" />
              </>
            )}
            <PaymentMethods data={paymentTypes} onClick={handlePaymentClick} />
          </>
        )}
      </div>
    </section>
  );
};

export default Checkout;
