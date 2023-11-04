import React, {useState, useEffect} from 'react';
import './Notifier.css';

const Notifier = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShow(true);
    }, 250);

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {clearTimeout(hideTimer); clearTimeout(showTimer)};
  }, []);

  return <div className={`notifier ${type === 'success' ? 'success' : 'fail'} ${show ? 'active' : 'hide'}`}>
    <p className="notifierMsg">{message}</p>
  </div>
};

export default Notifier;
