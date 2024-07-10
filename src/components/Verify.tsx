import { useEffect } from "react";

const Verify = ({ isVerified, requestVerification, checkVerified }) => {
  useEffect(() => {
    const verificationRequested = false;
    let intervalId: number;

    const checkVerification = () => {
      // if (!verificationRequested) {
      //     requestVerification();
      //     verificationRequested = true;
      // }

      const check = () => {
        console.log(isVerified);
        if (!isVerified) {
          checkVerified();
          intervalId = setTimeout(check, 5000);
        }
      };
      check();

      return () => clearTimeout(intervalId);
    };

    if (!isVerified) {
      intervalId = setTimeout(checkVerification, 0); // Start the verification process when the component mounts
    }

    return () => clearTimeout(intervalId); // Stop the verification process when the component unmounts
  }, [isVerified, checkVerified]);

  const handleVerifyClick = () => {
    if (!isVerified) {
      requestVerification();
    }
  };
  return (
    <>
      {!isVerified && (
        <div className="absolute px-5 py-10 text-2xl font-medium text-center shadow-lg bg-slate-100">
          <h2>Click here to verify your account!</h2>
          <button
            type="button"
            onClick={handleVerifyClick}
            className="px-4 py-2 mt-10 text-white bg-blue-500 rounded-md"
          >
            Verify
          </button>
        </div>
      )}
    </>
  );
};
export default Verify;
