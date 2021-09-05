/* eslint-disable no-undef */
{
  'use strict';

  /*
      document.getElementById('test-button').addEventListener('click', function(){
          const links = document.querySelectorAll('.titles a');
          console.log('links:', links);
      });
  */

  const titleClickHandler = function(event){

    event.preventDefault();
    const clickedElement = this;
    // console.log(`Link was clicked! ${event}`);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (const activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    //console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for(const activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    //console.log('clickedElement:', clickedElement);
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function(customSelector = ''){

    //console.log(customSelector);

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //console.log(titleList);

    /* [DONE] find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    /* [DONE] for each article */

    for(const article of articles){


      /* [DONE] get the article id */

      const articleId = article.getAttribute('Id');
      //console.log(articleId);

      /* find the title element */

      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      //console.log(articleTitle);

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);

      /* [DONE] insert link into titleList */

      titleList.innerHTML = titleList.innerHTML + linkHTML;

    }

    const links = document.querySelectorAll('.titles a');
    for(const link of links){
      link.addEventListener('click', titleClickHandler);
      //console.log(links);
    }
  };

  generateTitleLinks();

  const generateTags = function(){

    /* [NEW] create a new variable allTags with an empty array */

    let allTags = [];

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    /* [DONE] START LOOP: for every article: */

    for(const article of articles){

      /* [DONE] find tags wrapper */

      const titleList = article.querySelector(optArticleTagsSelector);

      //console.log(titleList)

      /* [DONE] make html variable with empty string */

      titleList.innerHTML = '';

      /* [DONE] get tags from data-tags attribute */

      const dataTags = article.getAttribute('data-tags');
      //console.log(dataTags);

      /* [DONE] split tags into array */

      const articleTagsArray = dataTags.split(' ');
      //console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for(let tag of articleTagsArray){
        //console.log(tag);

        /* [DONE] generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        // <li><a href="#tag-cat">cat</a></li>
        //console.log(linkHTML);

        /* [DONE] add generated code to html variable */

        let html = '';
        console.log(html);

        /* [NEW] check if this link is NOT already in allTags */

        if(allTags.indexOf(linkHTML) == -1){

          /* [NEW] add generated code to allTags array */

          allTags.push(linkHTML);
        }

        /* [DONE] insert HTML of all the links into the tags wrapper */

        titleList.innerHTML = titleList.innerHTML + linkHTML;

        /* END LOOP: for each tag */
      }

      /* END LOOP: for every article: */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.tags');

      /* [NEW] add html from allTags to tagList */
      tagList.innerHTML = allTags.join(' ');

    }
  };
  generateTags();

  const tagClickHandler = function (event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    //console.log(`Link was clicked! ${event}`);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    //console.log(href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* [DONE] find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */

    for(let activeTag of activeTags){


      /* [DONE] remove class active */

      activeTag.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */

    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const targetTags = document.querySelectorAll('a[href="' + href + '"]');
    //console.log(targetTags);

    /* [DONE] START LOOP: for each found tag link */

    for(let targetTag of targetTags){

      /* [DONE] add class active */

      targetTag.classList.add('active');
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  // eslint-disable-next-line no-inner-declarations
  const addClickListenersToTagLinks = function(){

    /* [DONE] find all links to tags */

    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */

    for(tagLink of tagLinks){

      /* [DONE] add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToTagLinks();

  // Generate Authors

  const optArticleAuthorLinkSelector = '.post-author',
    optAuthorsListSelector = '.author-name';

  const generateAuthors = function(){

    /* [NEW] create a new variable allTags with an empty object */
    let allAuthors = {};
    //console.log(allAuthors);

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    /* [DONE] START LOOP: for every article: */

    for(const article of articles){

      /* [DONE] find tags wrapper */

      const authorWrapper = article.querySelector(optArticleAuthorLinkSelector);

      //console.log(authorWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';
      //console.log(html);

      /* [DONE] get authors from data-authors attribute */

      const authorData = article.getAttribute('data-author');
      //console.log(authorData);

      /* [DONE] generate HTML of the link */

      const linkHTML = '<li><a href="#data-author-' + authorData + '"><span>' + authorData + '</span></a></li>';
      //console.log(linkHTML);

      /* [DONE] add generated code to html variable */

      html += linkHTML;
      //console.log(html);

      /* [DONE] insert HTML of all the links into the tags wrapper */

      authorWrapper.innerHTML = authorWrapper.innerHTML + linkHTML;
    }
  };
  generateAuthors(); // <----

  // Author Click Handler

  const authorClickHandler = function (event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    //console.log(`Link was clicked! ${event}`);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    //console.log(href);

    /* make a new constant "author" and extract tag from the "href" constant */

    const author = href.replace('#data-author-', '');
    console.log(`Link was clicked! ${event}`);

    /* [DONE] find all author links with class active */

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active tag link */

    for(let activeAuthor of activeAuthors){
      console.log(activeAuthor);

      /* [DONE] remove class active */

      activeAuthor.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */

    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetAuthors);

    /* [DONE] START LOOP: for each found tag link */

    for(let targetAuthor of targetAuthors){

      /* [DONE] add class active */

      targetAuthor.classList.add('active');
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');

  };

  //eslint-disable-next-line no-inner-declarations
  const addClickListenersToAuthors = function(){

    /* [DONE] find all authors */

    const allAuthorLinks = document.querySelectorAll('a[href^="#data-author-"]');

    /* [DONE] START LOOP: for each link */

    for(authorLink of allAuthorLinks){

      /* [DONE] add tagClickHandler as event listener for that link */

      authorLink.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}

