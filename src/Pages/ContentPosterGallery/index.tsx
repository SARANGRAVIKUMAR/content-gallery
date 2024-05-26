/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';

import './ContentPosterGalleryStyle.css';
import axios from 'axios';
import { Empty, Skeleton } from 'antd';
import Constants from '../../Global/constants';
import NavBar from '../../Components/Navbar';
import altImage from '../../Assets/images/altImage.png';

const InfiniteScrollExample1 = () => {
  const [ContentItems, setContentItems] = useState<any>([]);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(Constants.defaultPageNumber);
  const [totalContents, setTotalContents] = useState(Constants.defaultPageSize);
  const [filteredContentList, setFilteredContentList] = useState<any>([]);
  const [contentTitle, setContentTitle] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const fetchData = async () => {
    setIsContentLoading(true);
    try {
      const response = await axios.get(`${Constants.baseUrl}/data/page${currentPage}.json`);
      setContentItems((prevItems: any) => [...prevItems, ...response?.data?.page['content-items'].content]);
      setCurrentPage((prevPage) => prevPage + 1);
      setTotalContents(response?.data?.page['total-content-items']);
      setFilteredContentList((prevItems: any) => [...prevItems, ...response?.data?.page['content-items'].content]);
      setContentTitle(response?.data?.page?.title);
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
    const scrollPercentage = (window.scrollY
      / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (
      scrollPercentage < 80
      || isContentLoading
      || ContentItems.length >= totalContents
    ) {
      return;
    }
    fetchData(); // Fetch more data when scrolled to the bottom
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isContentLoading]); // Re-add event listener if loading state changes

  const handleContentSearch = (event: any) => {
    const searchText = event.target.value.toLowerCase().trim();
    modifyRenderList(searchText);
  };

  const modifyRenderList = (searchText: string) => {
    const filteredItems = ContentItems.filter(
      (item: any) => item.name.toLowerCase().includes(searchText),
    );
    setFilteredContentList(filteredItems);
  };

  const truncateString = (contentName: string) => {
    // handling content string based on window size
    if (width < height) {
      // portrait
      return contentName.length > width / 20 ? `${contentName.slice(0, width / 30)}...` : contentName;
    }
    // landscape
    return contentName.length > width / 40 ? `${contentName.slice(0, width / 40)}...` : contentName;
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <NavBar handleContentSearch={handleContentSearch} title={contentTitle} />

      <div style={{ overflowY: 'auto', marginTop: 60 }}>
        {filteredContentList.length ? (
          <div className="grid-container">
            {filteredContentList.map((content: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="grid-item" key={index}>
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
          <Empty />
        )}
        {isContentLoading && <Skeleton />}
      </div>
    </>
  );
};

export default InfiniteScrollExample1;
