/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { Button, Input } from 'antd';
import './navbar.css';
import React, { useEffect, useState } from 'react';
import backIcon from '../../Assets/icons/Back.png';
import searchIcon from '../../Assets/icons/search.png';
import Constants from '../../Global/constants';

interface NavbarProps {
  title: string,
  handleContentSearch: any,
  modifyRenderList: (searchTerm: string) => void;
}

const NavBar = ({
  title,
  handleContentSearch,
  modifyRenderList,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > Constants.initalScrollPosition) {
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
            {
              !showSearchIcon && (
                <Button
                  onClick={() => {
                    toggleSearchBarDisplay();
                    modifyRenderList('');
                  }}
                  type="text"
                  className="navButton showNavbarBackButton"
                >
                  <img
                    src={backIcon}
                    alt="Back"
                    className="navIcons"
                  />
                </Button>
              )
            }

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
                  <Input
                    maxLength={Constants.searchCharLimit}
                    size="middle"
                    onChange={handleContentSearch}
                    allowClear
                    placeholder="Search Content"
                  />
                  <Button
                    type="text"
                    onClick={() => {
                      toggleSearchBarDisplay();
                      modifyRenderList('');
                    }}
                    className="navButton showNavbarCancel"
                  >
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
