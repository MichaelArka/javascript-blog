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
        console.log(`Link was clicked! ${event}`); 
    
        /* [DONE] remove class 'active' from all article links  */
    
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (const activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');

        console.log('clickedElement:', clickedElement);
    
        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.post.active');

        for(const activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
    
        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute("href");

        console.log(articleSelector);
        
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);
            
        console.log(targetArticle);
        
        /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');

        console.log('clickedElement:', clickedElement);
    
    };

    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

    const generateTitleLinks = function(){

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        console.log(titleList);

        /* [DONE] find all the articles and save them to variable: articles */

        const articles = document.querySelectorAll(optArticleSelector);

        /* [DONE] for each article */ 
        
        for(const article of articles){

        
            /* [DONE] get the article id */
            
            const articleId = article.getAttribute('Id');

            console.log(articleId);

            /* find the title element */

            

            /* [DONE] get the title from the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            
            console.log(articleTitle);

            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            console.log(linkHTML);

                /* [DONE] insert link into titleList */
            
            let html = '';
            titleList.innerHTML = titleList.innerHTML + linkHTML;

        }

        const links = document.querySelectorAll('.titles a');
        for(const link of links){
            link.addEventListener('click', titleClickHandler);

            console.log(links);
        }
    }
    generateTitleLinks();

    const generateTags = function(){
        
        /* [DONE] find all articles */

        const articles = document.querySelectorAll(optArticleSelector);

        console.log(articles);
    
        /* [DONE] START LOOP: for every article: */

        for(const article of articles){
        
            /* [DONE] find tags wrapper */
            
            const titleList = article.querySelector(optArticleTagsSelector);

            console.log(titleList)

            /* make html variable with empty string */

            titleList.innerHTML = '';
        
            /* [DONE] get tags from data-tags attribute */

            const dataTags = article.getAttribute('data-tags');

            console.log(dataTags);
        
            /* [DONE] split tags into array */

            const articleTagsArray = dataTags.split(' ');

            console.log(articleTagsArray);
        
            /* START LOOP: for each tag */

            for(let tag of articleTagsArray){

                console.log(tag);
        
                /* generate HTML of the link */

                const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                // <li><a href="#tag-cat">cat</a></li>

                console.log(linkHTML);
            
                /* add generated code to html variable */

                let html = '';
            
                /* insert HTML of all the links into the tags wrapper */

                titleList.innerHTML = titleList.innerHTML + linkHTML;

            }

            /* END LOOP: for each tag */
        }
        /* END LOOP: for every article: */
    }
    generateTags();

    function tagClickHandler(event){

        /* prevent default action for this event */
        


        /* make new constant named "clickedElement" and give it the value of "this" */
        
        const clickedElement = this;
        console.log(`Link was clicked! ${event}`);

        /* make a new constant "href" and read the attribute "href" of the clicked element */

        const href = clickedElement.getAttribute("href");
        console.log(href);
        
        /* make a new constant "tag" and extract tag from the "href" constant */

        const tag = article.querySelector(href);
        
        /* find all tag links with class active */

        
        /* START LOOP: for each active tag link */
        
            /* remove class active */
        
        /* END LOOP: for each active tag link */
        
        /* find all tag links with "href" attribute equal to the "href" constant */
        
        /* START LOOP: for each found tag link */
        
            /* add class active */
        
        /* END LOOP: for each found tag link */
        
        /* execute function "generateTitleLinks" with article selector as argument */
    }
        
    function addClickListenersToTags(){
        /* find all links to tags */
        
        /* START LOOP: for each link */
        
            /* add tagClickHandler as event listener for that link */
        
        /* END LOOP: for each link */
    } 
    addClickListenersToTags();
}
