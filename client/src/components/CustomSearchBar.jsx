import PropTypes from 'prop-types';
import { MdSearch } from "react-icons/md";

  
const CustomSearchBar = ({ value, onChange, placeholder,className}) => {
  return (
    <div className={`${className} flex justify-between items-center bg-white border-2 border-gray-200 w-full shadow-sm p-3 rounded-md`} >
      <input
        placeholder={placeholder}
        className="w-full text-[16px] outline-none"
        type="text"
        value={value}
        onChange={onChange}
      />
     <MdSearch className='text-3xl text-gray-500 pl-1' />
    </div>
  );
};

CustomSearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default CustomSearchBar;
