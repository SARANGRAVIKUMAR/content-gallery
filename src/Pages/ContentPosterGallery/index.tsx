/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';

import './ContentPosterGalleryStyle.css';
import axios from 'axios';
import { Empty, Skeleton } from 'antd';
import Constants from '../../Global/constants';
import NavBar from '../../Components/Navbar';
import altImage from '../../Assets/images/altImage.png';

const ContentPosterGallery = () => {
  const [contentItems, setContentItems] = useState<any>([]);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(Constants.defaultPageNumber);
  const [totalContents, setTotalContents] = useState(Constants.defaultPageSize);
  const [filteredContentList, setFilteredContentList] = useState<any>([]);
  const [contentTitle, setContentTitle] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const cardRef = useRef<any>();

  useEffect(() => {
    // page scrolls to the top before it reloads
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    window.history.scrollRestoration = 'manual';

    // Cleanup function
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const fetchData = async () => {
    setIsContentLoading(true);
    try {
      const response = await axios.get(`${Constants.baseUrl}/data/page${currentPage}.json`);
      setContentItems((prevItems: any) => [...prevItems, ...response?.data?.page['content-items'].content]);
      setCurrentPage((prevPage) => prevPage + 1);
      setTotalContents(response?.data?.page['total-content-items']);
      setContentTitle(response?.data?.page?.title);
      if (searchItem) {
        modifyRenderList(searchItem);
      } else {
        setFilteredContentList((prevItems: any) => [...prevItems, ...response?.data?.page['content-items'].content]);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsContentLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // function to handle scroll event
  const handleScroll = () => {
    // trigger scroll event when reached 80% of the screen
    const scrollPercentage = (window.scrollY
      / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (
      scrollPercentage < Constants.scrollEventTriggerEventPercentage
      || isContentLoading
      || contentItems.length >= totalContents
    ) {
      return;
    }
    // Fetch more data when scrolled to the bottom
    fetchData();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isContentLoading, searchItem]); // Re-add event listener if loading state changes

  const handleContentSearch = (event: any) => {
    const searchText = event?.target?.value?.toLowerCase().trim();
    setSearchItem(searchText);
    modifyRenderList(searchText);
  };

  const modifyRenderList = (searchText: string) => {
    const filteredItems = contentItems.filter(
      (item: any) => item.name.toLowerCase().includes(searchText),
    );
    setFilteredContentList(filteredItems);
  };

  const truncateString = (str: string) => (str.length > windowWidth / 30 ? `${str.slice(0, windowWidth / 30)}...` : str);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <NavBar
        modifyRenderList={modifyRenderList}
        handleContentSearch={handleContentSearch}
        title={contentTitle}
      />

      <div className="appContainer">
        {filteredContentList.length ? (
          <div className="grid-container">
            {filteredContentList.map((content: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div ref={cardRef} className="grid-item" key={index}>
                <img
                  loading="lazy"
                  src={`${Constants.baseUrl}/images/${content['poster-image']}`}
                  alt={content.name}
                  onError={(e: any) => {
                    e.target.src = altImage;
                  }}
                />
                <p>{`${truncateString(content.name)}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="emptyContainer">
            <Empty />
          </div>
        )}
        {isContentLoading && <Skeleton />}
      </div>
    </>
  );
};

export default ContentPosterGallery;
