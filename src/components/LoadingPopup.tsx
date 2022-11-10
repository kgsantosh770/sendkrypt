import TransferAnimation from "../assets/images/transfer_animation.gif";

export default function LoadingPopup() {
    return (
        <div className="absolute z-10 w-full h-full flex items-center backdrop-sepia-0 bg-white/80">
            <div className="w-[700px] bg-customblue-200 m-auto p-10 rounded-xl">
                <p className="text-2xl text-white font-bold pb-4 text-center">... Transfer in progress ...</p>
                <p className="text-2xl text-white font-bold pb-4 text-center">Your transfer will complete shortly</p>
                <img src={TransferAnimation} alt="transfering" className="w-3/5 mx-auto" />
            </div>
        </div>
    )
}
