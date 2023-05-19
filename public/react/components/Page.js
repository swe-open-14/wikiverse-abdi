import React, { useEffect, useState } from 'react';
// this imports "http://localhost:1234"
import apiURL from '../api';

export const Page = (props) => {
  // this state holds user object
  const [author, setAuthor] = useState("");
   // this state holds the corresponding tag linked to the user object
  const [tag, setTag] = useState([]);
  // this state holds the page that is selected
  const [selectedPage, setSelectedPage] = useState(null);


  // This useEffect makes a get request to the server to retreive the the user which has the corresponding ID to retreive their name
  useEffect(() => {
    async function fetchAuthorData() {
      try {
        const authorResponse = await fetch(`${apiURL}/users/${props.page.authorId}`);
        const authorData = await authorResponse.json();
        setAuthor(authorData);
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchAuthorData();
  }, [props.page.authorId]);
  
  // Since Page and User are associated with each other this makes a get request to get the tag associated with the page specified by the id
  useEffect(() => {
    async function fetchTagData() {
      try {
        const tagResponse = await fetch(`${apiURL}/wiki/${props.page.id}/tag`);
        const tagData = await tagResponse.json();
        setTag(tagData);
      } catch (err) {
        console.log(err);
      }
    }
  
    fetchTagData();
  }, [props.page.id]);
  
  
  // This function/Event handler is for the <h3> elements so when a user clicks any of the titles/h3 that titles/h3 object will be the current page and be rendered
  
  const handleTitleClick = (page) => {
    setSelectedPage(page);
    console.log(page)
  };

  // This is linked to the "back to wiki" button which makes pages null therefore hide any rendered info
  const handleBackToWikiClick = () => {
    // Event handler for the "Back to Wiki" button click
    setSelectedPage(null);
  };

  // This checks if there is indeed a current page which has been selected and if so renders its corresponding information
  if (selectedPage) {
    return (
      <>
        <h3>{selectedPage.title}</h3>
        <p className='bold'>Author: <span className='light'>{author.name}</span></p>
        <p className='bold'>Published: <span>{props.page.createdAt.slice(0, 10)}</span></p>
        <p>{selectedPage.content}</p>
        <p>Tags:</p>
        {tag.length > 0 ? (
          <ul>
            {tag.map((tagItem) => (
              <li key={tagItem.id}>{tagItem.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tags available</p>
        )}
        <button  onClick={handleBackToWikiClick}>Back to Wiki</button>
      </>
    );
    // Otherwise only render the titles/h3
  } else {
    return (
      <>
               <h3 onClick={() => handleTitleClick(props.page)}>{props.page.title}</h3>

      </>
    );
  }
}
