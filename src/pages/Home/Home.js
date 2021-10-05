import './Home.css';
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import AddressForm from "../../components/AddressForm/AddressForm";
import {useEffect, useState} from "react";

const getAddressFromLS = () => {
  return localStorage.getItem('tracker-cam-address') || '';
};
const setAddressInLS = value => {
  localStorage.setItem('tracker-cam-address', value);
};

function Home() {
  const [address, setAddress] = useState('');
  const [addressValid, setAddressValid] = useState('');
  useEffect(() => {
    setAddress(getAddressFromLS());
  }, []);
  const handleSelectChange = e => setAddress(e.target.value);
  const isValidHttpUrl = ({address, protocol, login, password, ip, port, path}) => {
    console.log(address, (
      (login.length && password.length)
      || (!login.length && !password.length)
    ), {address, protocol, login, password, ip, port, path});

    setAddressValid(protocol.length
      && ip.length
      && (
        (login.length && password.length)
        || (!login.length && !password.length)
      )
      && /^\d+$/.test(port)
    );
  };
  const updateAddress = ({address, protocol, login, password, ip, port, path}) => {
    isValidHttpUrl({address, protocol, login, password, ip, port, path});
    setAddress(address);
  };
  useEffect(() => {
    if (addressValid) {
      setAddressInLS(address);
    }
  }, [address, addressValid]);
  return (
    <>
      <header>
        <h1>Tracker GUI</h1>
        <p>Jakiś tam tekst co tam apka może robić albo krótka instrukcja</p>
      </header>

      <div className="content home">
        <div className="links">
          <LinkBtn url="/polygon" disabled={!address.length}>Zaznaczenie sceny</LinkBtn>
          <LinkBtn url="/video" disabled={!address.length}>Podgląd śledzenia</LinkBtn>
        </div>
        {address}
        <p>Testowy tekst na test pulla</p>
        <p>Testowy tekst na test pulla</p>
        <p>Testowy tekst na test pulla</p>
        {
          !address.length || !addressValid
            ? <p>Aby przejść dalej musisz podać poprawny adres IP kamery</p>
            : ''
        }

        <div className="address">
          <AddressForm address={address} addressUpdated={updateAddress}/>
          <div className="addresses-from-local-network">
            <span>lub wybierz z listy</span>
            <select onChange={handleSelectChange}>
              <option value="">Wybierz</option>
              <option value="http://facebook.com">http://facebook.com</option>
              <option value="ftp://admin:pass@123.456.789:1212">ftp://admin:pass@123.456.789:1212</option>
              <option value="432.64.2:4443">432.64.2:4443</option>
              <option value="ssh://123.456.789:1212">ssh://123.456.789:1212</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
