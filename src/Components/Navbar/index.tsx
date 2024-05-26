import { Button, Input } from 'antd';
import './navbar.css';
import React, { useEffect, useState } from 'react';
import backIcon from '../../Assets/icons/Back.png';
import searchIcon from '../../Assets/icons/search.png';

interface NavbarProps {
  title: string,
  handleContentSearch: any
}

const NavBar = ({ title, handleContentSearch }: NavbarProps) => {
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
    <div className={`navBar ${scrolled ? 'bluredNavBar' : 'solidColorNavBar'}`}>
      <div style={{ width: '100%' }}>
        <div
          className="navBarContents"
        >
          <div className="navBarContents-left">
            <Button type="text" className="navButton">
              <img
                src={backIcon}
                alt="Back"
                className="navIcons"
              />
            </Button>
            <span
              className={`title ${!showSearchIcon && 'navbarTitleDisplay'}`}
              style={{ whiteSpace: 'nowrap' }}
            >{title}
            </span>
          </div>
          <div className={`${!showSearchIcon && 'navBarContents-toggleView'} navBarContents-right`}>
            {
              showSearchIcon ? (
                <Button type="text" onClick={toggleSearchBarDisplay} className="navButton">
                  <img
                    src={searchIcon}
                    alt="Search"
                    className="navIcons"
                  />
                </Button>
              ) : (
                <>
                  <Input maxLength={20} size="middle" onChange={handleContentSearch} allowClear placeholder="Search Content" />
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
