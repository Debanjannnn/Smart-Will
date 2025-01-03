
export default function BalanceDisplay({ balance }) {
    return (
        <div className="flex justify-center items-center mt-4">
               <div className=" p-6 rounded-xl shadow-lg flex items-center space-x-6">
               <p className="font-['Press_Start_2P'] text-white text-lg md:text-2xl">
                   We have kept {balance} EDU, save with us
                 </p>
          <img
            src="https://media.tenor.com/o_E6C9Jez2YAAAAj/chest-minecraft.gif"
            alt="Minecraft Chest"
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>
      </div>
    );
  }
  
