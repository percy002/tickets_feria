const HeaderContent = () => {
  return (
    <div className="bg-portada w-screen bg-top bg-cover">
        <div className="flex flex-col py-8 h-4/6">
          <div className="w-full flex justify-around px-8">
            <img
              src="images/logos/logo_gore2.png"
              alt="logo gobierno regional del cusco"
              className="w-36 md:w-64 object-contain"
            />
            <img
              src="images/logos/logo_expoferia_2024.png"
              alt="logo gobierno regional del cusco"
              className="w-36 md:w-64 object-contain"
            />
          </div>
          <div className="flex justify-center">
            <p className="text-white font-bold text-3xl text-center">
              !Compre su entrada ahora¡
            </p>
          </div>
        </div>
      </div>
  )
}
export default HeaderContent