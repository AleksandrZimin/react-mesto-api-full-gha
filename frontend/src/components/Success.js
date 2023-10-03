import success from "../images/Union.png";
import SuccessCss from "./Success.css";

function Success({ isOpen, onClose }) {
  return (
    <div className="popup succses-popup">
      <div className="popup__container popup__success ">
        <img src={success} className="popup__img"></img>
        <span className="popup__text">Вы успешно зарегистрировались!</span>

        <button
          type="button"
          className="button popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Success;
