{
    'use strict';
        
    /*
            document.getElementById('test-button').addEventListener('click', function(){
                const links = document.querySelectorAll('.titles a');
                console.log('links:', links);
            });
    */
    {
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
        optTitleListSelector = '.titles';
        optArticleTagsSelector = '.post-tags .list'

        const generateTitleLinks = function(){

            /* [DONE] remove contents of titleList */

            const titleList = document.querySelector(optTitleListSelector);
            titleList.innerHTML = '';

            console.log(titleList);

            /* find all the articles and save them to variable: articles */


            /* for each article */

            const articles = document.querySelectorAll(optArticleSelector); 
            
            for(const article of articles){

            
            /* get the article id */
                
                const articleId = article.getAttribute('Id');

                console.log(articleId);

            /* find the title element */

                

            /* get the title from the title element */

                const articleTitle = article.querySelector(optTitleSelector).innerHTML;
                
                console.log(articleTitle);

            /* create HTML of the link */

                const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

                console.log(linkHTML);

            /* insert link into titleList */
                
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

        const generateTag = function(){
            
            /* find all articles */
        
            /* START LOOP: for every article: */
        
            /* find tags wrapper */
        
            /* make html variable with empty string */
        
            /* get tags from data-tags attribute */
        
            /* split tags into array */
        
            /* START LOOP: for each tag */
        
                /* generate HTML of the link */
        
                /* add generated code to html variable */
        
            /* END LOOP: for each tag */
        
            /* insert HTML of all the links into the tags wrapper */
        
            /* END LOOP: for every article: */
        }
        
        generateTags();
    }
}