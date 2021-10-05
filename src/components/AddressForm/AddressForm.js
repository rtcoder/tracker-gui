import './AddressForm.css';
import {useEffect, useState} from "react";

function AddressForm({address: _address, addressUpdated}) {
  const [protocol, setProtocol] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassWord] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [path, setPath] = useState('');
  const [address, setAddress] = useState('');
  const [addressEmpty, setAddressEmpty] = useState(true);

  const updateParts = fullAddress => {
    const isAddressEmpty = !fullAddress.length;
    if (isAddressEmpty) {
      setProtocol('');
      setLogin('');
      setPassWord('');
      setIp('');
      setPort('');
      setPath('');
      return;
    }
    const protocolLocation = fullAddress.split('//');
    let _protocol = '';
    let _location = '';
    if (protocolLocation.length === 2) {
      _protocol = protocolLocation[0].replace(':', '');
      _location = protocolLocation[1];
    } else {
      _location = protocolLocation[0];
    }

    const credentialsHostPort = _location.split('@');
    let _credentials = '';
    let _hostPortPath = '';
    if (credentialsHostPort.length === 2) {
      _credentials = credentialsHostPort[0];
      _hostPortPath = credentialsHostPort[1];
    } else {
      _hostPortPath = credentialsHostPort[0];
    }
    const [_login = '', _password = ''] = _credentials.split(':');
    const [_hostPort, ..._path] = _hostPortPath.split('/');
    const [_host, _port = ''] = _hostPort.split(':');

    setProtocol(_protocol);
    setLogin(_login);
    setPassWord(_password);
    setIp(_host);
    setPort(_port);
    setPath(_path);

    if (addressUpdated) {
      if (isAddressEmpty) {
        addressUpdated({address: '', protocol: '', login: '', password: '', ip: '', port: '', path: ''});
      } else {
        addressUpdated({
          address: fullAddress,
          protocol: _protocol,
          login: _login,
          password: _password,
          ip: _host,
          port: _port,
          path: _path
        });
      }
    }
  };

  useEffect(() => {
    updateParts(_address);
  }, [_address]);

  useEffect(() => {
    if(!address.startsWith('[')) {
      updateParts(address);
    }
  }, [address]);

  useEffect(() => {
    let isAddressEmpty;
    const ipPort = port.length ? `${ip}:${port}` : ip;
    const loginPassword = login.length || password.length ? `${login}:${password}` : '';
    const location = loginPassword.length ? `${loginPassword}@${ipPort}` : ipPort;
    const __protocol = protocol.length ? protocol : 'rstp';
    let addr = path.length ? `${location}/${path}` : `${location}`;
    addr = addr.length ? `${__protocol}://${addr}` : '[protokół]://[login]:[hasło]@[ip]:[port]/[ścieżka]';
    isAddressEmpty = addr.startsWith('[');
    setAddress(addr);

    if (addressUpdated) {
      if (isAddressEmpty) {
        addressUpdated({address: '', protocol: '', login: '', password: '', ip: '', port: '', path: ''});
      } else {
        addressUpdated({address: addr, protocol, login, password, ip, port, path});
      }
    }
    setAddressEmpty(isAddressEmpty);
  }, [protocol, login, password, ip, port, path, addressEmpty]);

  const handleAddressChange = e => setAddress(e.target.value);
  const handleProtocolChange = e => setProtocol(e.target.value);
  const handleLoginChange = e => setLogin(e.target.value);
  const handlePasswordChange = e => setPassWord(e.target.value);
  const handleIpChange = e => setIp(e.target.value);
  const handlePortChange = e => setPort(e.target.value);
  const handlePathChange = e => setPath(e.target.value);

  return (
    <div className="form">
      <div className="inputs">
        <input type="text" placeholder="adres" value={address.startsWith('[') ? '' : address}
               onChange={handleAddressChange}/>
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