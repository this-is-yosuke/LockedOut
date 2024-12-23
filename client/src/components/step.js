const Step = ({ iconPath, title, description }) => {
    return (<div className="text-center p-6 bg-stone-800 rounded-lg shadow-lg">
        <div className="text-red-600 text-4xl mb-4">
          <svg className="w-12 h-12 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-stone-200 mb-2">{title}</h3>
        <p className="text-stone-400">{description}</p>
      </div>);
};
export default Step;
