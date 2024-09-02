import {HashLoader} from 'react-spinners';

const Loader = () => {
  return (
    <div className='flex justify-center top-[50%] left-[50%] absolute'>
      <HashLoader size={40} color='purple'/>
    </div>
  );
};

export default Loader;
