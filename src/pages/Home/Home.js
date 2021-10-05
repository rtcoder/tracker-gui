import './Home.css';
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import AddressForm from "../../components/AddressForm/AddressForm";
import {useState} from "react";

function Home() {
  const [address, setAddress] = useState('');

  const handleSelectChange = e => setAddress(e.target.value);

  return (
    <>
      <header>
        <h1>Tracker GUI</h1>
        <p>Jakiś tam tekst co tam apka może robić albo krótka instrukcja</p>
      </header>

      <div className="content home">
        <div className="links">
          <LinkBtn url="/polygon">Zaznaczenie sceny</LinkBtn>
          <LinkBtn url="/video">Podgląd śledzenia</LinkBtn>
        </div>

        <div className="address">
          <AddressForm address={address} addressUpdated={val => setAddress(val)}/>
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
