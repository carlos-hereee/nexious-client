type WelcomeMEssageProps = {
  user: any;
  message: string;
};

const WelcomeMessage: React.FC<WelcomeMEssageProps> = (props) => {
  const { user, message } = props;
  return (
    <div>
      <h2 className="heading">
        {message} {user?.nickname ? user.nickname : user.username}
      </h2>
    </div>
  );
};
export default WelcomeMessage;
