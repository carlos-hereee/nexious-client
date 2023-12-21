import { ConnectAccountOnboarding, ConnectComponentsProvider } from "@stripe/react-connect-js";

const AccountOnboardingUI = () => {
  const stripeConnectInstance = (e: any) => {
    console.log("e :>> ", e);
  };
  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectAccountOnboarding
        onExit={() => {
          console.log("The account has exited onboarding");
        }}
        // Optional: make sure to follow our policy instructions above
        // fullTermsOfServiceUrl="{{URL}}"
        // recipientTermsOfServiceUrl="{{URL}}"
        // privacyPolicyUrl="{{URL}}"
        // skipTermsOfServiceCollection={false}
      />
    </ConnectComponentsProvider>
  );
};
export default AccountOnboardingUI;
