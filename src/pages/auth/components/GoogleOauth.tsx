import { GoogleLogin } from "@react-oauth/google";

interface GoogleSigninProps {
  onSuccess: (token: string) => void;
  onError: () => void;
}

export const GoogleSignin: React.FC<GoogleSigninProps> = ({
  onSuccess,
  onError,
}) => {
  return (
    <GoogleLogin
      onSuccess={(response) => {
        if (response.credential) {
          onSuccess(response.credential);
        } else {
          console.error("No credential received");
          onError();
        }
      }}
      onError={() => {
        console.error("Login Failed");
        onError();
      }}
    />
  );
};
