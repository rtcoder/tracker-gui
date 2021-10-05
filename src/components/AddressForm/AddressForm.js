import './AddressForm.css';
import {useEffect, useState} from "react";

function AddressForm({address: _address}) {
  const [protocol, setProtocol] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassWord] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [path, setPath] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    console.log({_address});



  }, [_address]);

  useEffect(() => {
    const ipPort = port.length ? `${ip}:${port}` : ip;
    const loginPassword = login.length || password.length ? `${login}:${password}` : '';
    const location = loginPassword.length ? `${loginPassword}@${ipPort}` : ipPort;
    const __protocol = protocol.length ? protocol : 'rstp';
    let addr = path.length ? `${location}/${path}` : `${location}`;
    addr = addr.length ? `${__protocol}://${addr}` : '[protokół]://[login]:[hasło]@[ip]:[port]/[ścieżka]';
    setAddress(addr);
  }, [protocol,login, password, ip, port, path]);

  const handleProtocolChange = e => setProtocol(e.target.value);
  const handleLoginChange = e => setLogin(e.target.value);
  const handlePasswordChange = e => setPassWord(e.target.value);
  const handleIpChange = e => setIp(e.target.value);
  const handlePortChange = e => setPort(e.target.value);
  const handlePathChange = e => setPath(e.target.value);

  return (
    <div className="form">
      <code>{address}</code>
      <div className="inputs">
        <input type="text" placeholder="protokół" value={protocol} onChange={handleProtocolChange}/>
        <input type="text" placeholder="login" value={login} onChange={handleLoginChange}/>
        <input type="text" placeholder="hasło" value={password} onChange={handlePasswordChange}/>
        <input type="text" placeholder="ip" value={ip} onChange={handleIpChange}/>
        <input type="text" placeholder="port" value={port} onChange={handlePortChange}/>
        <input type="text" placeholder="ścieżka" value={path} onChange={handlePathChange}/>
      </div>
    </div>
  );
}

export default AddressForm;