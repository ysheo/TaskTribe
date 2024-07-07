import React from 'react';

const InputField = ({ label, type, value, onChange, name, autoComplete, valid, message, showToggle, toggleVisible, visible }) => {
    return (
        <div className={`inputBox ${name}`}>
            <h5>{label}</h5>
            <div className='content'>
                <div className='text'>
                    <input
                        type={visible ? 'text' : type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        title={label}
                        autoComplete={autoComplete}
                    />
                    {showToggle && (
                        <span className="material-symbols-outlined" style={{color: visible? '#666': '#ccc'}} onClick={toggleVisible}>
                            {visible ? 'visibility' : 'visibility_off'}
                        </span>
                    )}
                </div>
                {!valid && value.length > 0 && (
                    <div className='warn_box'>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;