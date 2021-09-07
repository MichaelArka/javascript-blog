/* eslint-disable no-undef */
{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    cloudClassCount: '5',
    cloudClassPrefix: 'tag-size-',
    articleAuthorLinkSelector: '.post-author',
    authorsListSelector: '.author-name',
    tagListSelector: '.tags.list',
  };

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

  const generateTitleLinks = function(customSelector = ''){
  //console.log(customSelector);

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';
    //console.log(titleList);

    /* [DONE] find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(opt.articleSelector + customSelector);

    /* [DONE] for each article */

    for(const article of articles){


      /* [DONE] get the article id */

      const articleId = article.getAttribute('Id');
      //console.log(articleId);

      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      //console.log(articleTitle);

      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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

    /* [NEW] create a new variable allTags with an empty object */

    let allTags = {};

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(opt.articleSelector);
    //console.log(articles);

    /* [DONE] START LOOP: for every article: */

    for(const article of articles){

      /* [DONE] find tags wrapper */

      const titleList = article.querySelector(opt.articleTagsSelector);

      //console.log(titleList)

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');
      //console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for(let tag of articleTagsArray){
        //console.log(tag);

        /* [DONE] generate HTML of the link */

        const tagLinkHTMLData = {id: tag, title: tag};
        const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
        //console.log(tagLinkHTML);

        /* [DONE] add generated code to html variable */

        html += tagLinkHTML;
        //console.log(html);

        /* [NEW] check if this link is NOT already in allTags */

        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* [NEW] find list of tags in right column */

        const tagList = document.querySelector(opt.tagListSelector);

        const tagsParams = calculateTagsParams(allTags);
        //console.log('tagsParams:', tagsParams);

        /* [NEW] create variable for all links HTML code */

        const allTagsData = {tags: []};

        /* [NEW] START LOOP: for each tag in allTags: */

        for(let tag in allTags){

          /* [NEW] generate code of a link and add it to allTagsHTML */

          //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>'
          //console.log('tagLinkHTML:', tagLinkHTML);

          allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
          });
        }

        /*[NEW] add HTML from allTagsHTML to tagList */

        tagList.innerHTML = templates.tagCloudLink(allTagsData);
        //console.log(allTagsData);


        /* [DONE] insert HTML of all the links into the tags wrapper */

        titleList.innerHTML = titleList.innerHTML + ' ' + tagLinkHTML;

        /* END LOOP: for each tag */
      }

      /* END LOOP: for every article: */

    }
  };

  // Calculate tags params

  const calculateTagsParams = function(tags){
    const params = { max: 0, min: 999999 };

    for(let tag in tags){
      //console.log(tag + ' is used ' + tags[tag] + ' times ');

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  };

  // Calculate tag class

  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min,
      normalizedMax = params.max - params.min,
      percentage = normalizedCount / normalizedMax,
      classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );

    return opt.cloudClassPrefix + classNumber;
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
    //console.log(tag);

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

    for(const tagLink of tagLinks){

      /* [DONE] add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToTagLinks();

  // Generate Authors

  const generateAuthors = function(){

    /* [NEW] create a new variable allTags with an empty object */

    let allAuthors = {};
    //console.log(allAuthors);

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(opt.articleSelector);
    //console.log(articles);

    /* [DONE] START LOOP: for every article: */

    for(const article of articles){

      /* [DONE] find tags wrapper */

      const authorWrapper = article.querySelector(opt.articleAuthorLinkSelector);
      //console.log(authorWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';
      //console.log(html);

      /* [DONE] get authors from data-authors attribute */

      const authorData = article.getAttribute('data-author');
      //console.log(authorData);

      /* [DONE] generate HTML of the link */

      const authorLinkHTMLData = {id: authorData, title: authorData};
      const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
      //console.log(linkHTML);

      /* [DONE] add generated code to html variable */

      html += authorLinkHTML;
      //console.log(html);

      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[authorData]) {

        /* [NEW] add tag to allAuthors object */
        allAuthors[authorData] = 1;
      } else {
        allAuthors[authorData]++;
      }

      const authorList = document.querySelector(opt.authorsListSelector);

      /* [NEW] create variable for all links HTML code */
      const allAuthorsData = {authors: []};

      /* [NEW] START LOOP: for each tag in allTags: */
      for (let author in allAuthors) {

        allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author],
        });
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = authorWrapper.innerHTML + authorLinkHTML;

      /*[NEW] add HTML from allAutorsHTML to tagList */
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData)
    }
  };

  generateAuthors();

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

    const author = href.replace('#author-', '');
    //console.log(`Link was clicked! ${event}`);

    /* [DONE] find all author links with class active */

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active tag link */

    for(let activeAuthor of activeAuthors){
      //console.log(activeAuthor);

      /* [DONE] remove class active */

      activeAuthor.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */

    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');
    //console.log(targetAuthors);

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

    const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for each link */

    for(let authorLink of allAuthorLinks){

      /* [DONE] add tagClickHandler as event listener for that link */

      authorLink.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}

