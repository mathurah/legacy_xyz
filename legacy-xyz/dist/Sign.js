import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import SignModal from "./SignModal";
import { generateSignature } from "./utils/utils";
import { Button } from "@mui/material";

const signMessage = (account, name, twitterHandle) => {
  if (name && twitterHandle) {
    return `${name} was here. By signing, you are leaving your legacy on this corner of the internet. \n
      account: ${account}\n
      twitter: ${twitterHandle}
    `;
  } else {
    return `${name} was here. By signing, you are leaving your legacy on this corner of the internet. \n
    account: ${account}
    `;
  }
};

const Sign = ({
  projectId
}) => {
  const {
    activate,
    active,
    account
  } = useWeb3React(); // for the modal

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClose = () => setIsModalVisible(false);

  const handleConnect = () => {
    setIsModalVisible(true);
  };

  const injected = new InjectedConnector();
  const walletlink = new WalletLinkConnector({
    appName: 'legacy_xyz'
  });

  const handleLoginClick = type => {
    if (type === 'coinbase') {
      activate(walletlink).then(() => {
        console.log('coinbase connect', active, account);

        if (!active) {
          throw new Error('Failed to connect wallet');
        }
      });
    } else if (type === 'metamask') {
      activate(injected).then(() => {
        console.log('metamask connect', active, account);

        if (!active) {
          throw new Error('Failed to connect wallet');
        }
      });
    }
  };

  const signFromWallet = async (account, name, twitterHandle) => {
    return await generateSignature(signMessage(account, name, twitterHandle));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    size: "large",
    sx: {
      maxWidth: '200px',
      background: '#000000',
      textTransform: 'none',
      fontSize: 20,
      borderRadius: 3,
      ':hover': {
        background: '#000000',
        opacity: 0.8
      }
    },
    onClick: handleConnect
  }, "Sign here"), /*#__PURE__*/React.createElement(SignModal, {
    projectId: projectId,
    account: account,
    isModalVisible: isModalVisible,
    handleLoginClick: handleLoginClick,
    handleClose: handleClose,
    signFromWallet: signFromWallet
  }));
};

export default Sign;