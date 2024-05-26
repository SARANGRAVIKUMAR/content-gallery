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
    if (
      window.innerHeight + document.documentElement.scrollTop
      !== document.documentElement.offsetHeight
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

  // const handleContentSearch = (event: any) => {
  //   const searchText = event.target.value.toLowerCase().trim();
  //   modifyRenderList(searchText);
  // };

  // const modifyRenderList = (searchText: string) => {
  //   const filteredItems = ContentItems.filter(
  //     (item: any) => item.name.toLowerCase().includes(searchText),
  //   );
  //   setFilteredContentList(filteredItems);
  // };

  const truncateString = (str: string) => (str.length > width / 30 ? `${str.slice(0, width / 30)}...` : str);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log({ width });

  return (
    <>
      {/* <Input size="large" onChange={handleContentSearch} placeholder="large size" /> */}
      <NavBar title={contentTitle} />

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
