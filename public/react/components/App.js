import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [selectedPage, setSelectedPage] = useState(null);

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	const handleBackToWikiClick = () => {
		setSelectedPage(null);
	  };

	return (
		<main className=''>	
      <h1>WikiVerse</h1>
	  <button>Add Article</button>
	  <div className='mainContainer'>
	  <PagesList pages={pages} setSelectedPage={setSelectedPage} />
        {selectedPage && (
    <Page page={selectedPage}
            handleBackToWikiClick={handleBackToWikiClick}
          />
        )}
			</div>
		</main>
	)
}