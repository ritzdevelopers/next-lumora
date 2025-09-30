import React from 'react'

const Proximities = () => {
  return (
    <section className="pb-8">
      <h1 className="md:text-4xl text-3xl text-center py-8">Proximities</h1>
      <div className="flex flex-wrap justify-center items-stretch">
        <div className="lg:w-[24%] w-[50%]  flex flex-col justify-center border-r border-greenTheme border-solid border-r-1 ">
          <div className="py-4">
            <p className="text-center sm:text-lg text-sm">2.5 Hours away from</p>
            <h3 className="text-center sm:text-lg text-sm">Delhi</h3>
          </div>
          <div className="py-4 border-greenTheme border-solid border-t">
            <p className="text-center sm:text-lg text-sm">15 Mins away from</p>
            <h3 className="text-center sm:text-lg text-sm">Shakumbhari Devi Temple</h3>
          </div>
        </div>
        <div className="lg:w-[24%] w-[50%] md:border-b lg:border-b-0 border-b-1 flex flex-col justify-center lg:border-r border-greenTheme border-solid border-r-1">
          <div className="py-4">
          <p className="text-center sm:text-lg text-sm">Bang on</p>
            <h3 className="text-center sm:text-lg text-sm">Delhi-Dehradun</h3>
            <h3 className="text-center sm:text-lg text-sm">Expressway</h3>
          </div>
          <div className="py-4 border-greenTheme border-solid border-t">
            <p className="text-center sm:text-lg text-sm">2 Hours away from</p>
            <h3 className="text-center sm:text-lg text-sm">AIMS</h3>
            <h3 className="text-center sm:text-lg text-sm">Rishikesh</h3>
          </div>
        </div>
        <div className="lg:w-[24%] w-[50%]  flex flex-col border-greenTheme border-solid border-r-1 border-r justify-center border-t border-t-1 lg:border-t-0 ">
          <div className="py-4">
            <p className="text-center sm:text-lg text-sm">2 Hours away from</p>
            <h3 className="text-center sm:text-lg text-sm">Rishikesh</h3>
          </div>
          <div className="py-4 border-greenTheme border-solid border-t">
            <p className="text-center sm:text-lg text-sm">3 Hours away from</p>
            <h3 className="text-center sm:text-lg text-sm">Tehri Lake</h3>
          </div>
        </div>
        <div className="lg:w-[24%] w-[50%] border-t border-t-1 border-greenTheme border-solid lg:border-t-0 flex flex-col justify-center">
          <div className="py-4">
            <p className="text-center sm:text-lg text-sm">3 Hours away from</p>
            <h3 className="text-center sm:text-lg text-sm">Sonipat</h3>
          </div>
          <div className="py-4 border-greenTheme border-solid border-t">
            <p className="text-center sm:text-lg text-sm">3.5 Hours away from</p>
            <h3 className="text-center sm:text-lg text-sm">Chandigarh</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proximities
