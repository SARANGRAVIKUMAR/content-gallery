import { Button, Input } from 'antd';
import './navbar.css';
import React, { useEffect, useState } from 'react';
import backIcon from '../../Assets/icons/Back.png';
import searchIcon from '../../Assets/icons/search.png';

interface NavbarProps {
  title: string
}

const NavBar = ({ title }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSearchBarDisplay = () => {
    setShowSearchIcon(!showSearchIcon);
  };

  return (
    <div className={`navBar ${scrolled ? 'scrolled' : 'stillScrollBar'}`}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Button type="text" className="navButton">
              <img
                src={backIcon}
                alt="Back"
                style={{ width: '20px', height: '20px' }}
              />
            </Button>
            <span className={`title ${!showSearchIcon && 'navbarTitleDisplay'}`} style={{ whiteSpace: 'nowrap' }}>{title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} className={`${!showSearchIcon && 'abcd'}`}>
            {
              showSearchIcon ? (
                <Button type="text" onClick={toggleSearchBarDisplay} className="navButton">
                  <img
                    src={searchIcon}
                    alt="Search"
                    style={{ width: '20px', height: '20px' }}
                  />
                </Button>
              ) : (
                <>
                  <Input size="middle" allowClear placeholder="large size" />
                  <Button type="text" onClick={toggleSearchBarDisplay} className="navButton">
                    Cancel
                  </Button>
                </>
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
