// ==UserScript==
// @name         TransfermarktUserHide
// @namespace    https://transfermarkt.de
// @version      1.2.0
// @description  Hide specific users from the forum, including quotes (toggle on click, fixed event bubbling).
// @author       Lupus
// @match        https://www.transfermarkt.de/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const hiddenUsers = new Set(["User1", "User2", "User3"]); // change / add / remove users here

    function hideUserPosts() {
        const userLinks = document.querySelectorAll('.forum-user');
        userLinks.forEach(link => {
            if (hiddenUsers.has(link.textContent.trim())) {
                const parentBox = link.closest('.box');
                if (parentBox) {
                    parentBox.style.display = "block";
                    parentBox.style.maxHeight = "40px";
                    parentBox.style.overflow = "hidden";
                    parentBox.style.cursor = "pointer";

                    const postHeader = parentBox.querySelector('.post-header-titel');
                    if (postHeader) {
                        const postNumberLink = postHeader.querySelector('.link-zum-post');
                        if (postNumberLink) {
                            postNumberLink.textContent += ` von ${link.textContent.trim()}`;
                        }
                    }

                    parentBox.addEventListener('click', function() {
                        if (parentBox.style.maxHeight === "40px") {
                            parentBox.style.maxHeight = "none";
                            parentBox.style.overflow = "visible";
                        } else {
                            parentBox.style.maxHeight = "40px";
                            parentBox.style.overflow = "hidden";
                        }
                    });
                }
            }
        });
    }

    function hideQuotesFromHiddenUsers() {
        const quotes = document.querySelectorAll('.quote');
        quotes.forEach(quote => {
            const bold = quote.querySelector('b');
            if (bold && bold.textContent.includes('Zitat von')) {
                const userLink = bold.querySelector('a');
                if (userLink) {
                    const quotedUser = userLink.textContent.trim();
                    if (hiddenUsers.has(quotedUser)) {
                        const placeholder = document.createElement('div');
                        placeholder.textContent = `Zitat von ${quotedUser} ausgeblendet. (Anklicken zum Anzeigen)`;
                        placeholder.style.background = "#f6f6f6";
                        placeholder.style.border = "1px solid #ccc";
                        placeholder.style.padding = "8px";
                        placeholder.style.margin = "4px 0";
                        placeholder.style.cursor = "pointer";
                        placeholder.style.fontStyle = "italic";

                        quote.style.display = "none";
                        quote.parentNode.insertBefore(placeholder, quote);

                        // NEU: stopPropagation verhindert das Schließen des gesamten Beitrags
                        placeholder.addEventListener('click', function(event) {
                            event.stopPropagation();
                            placeholder.style.display = "none";
                            quote.style.display = "";
                        });
                        quote.addEventListener('click', function(event) {
                            event.stopPropagation();
                            quote.style.display = "none";
                            placeholder.style.display = "";
                        });
                    }
                }
            }
        });
    }

    hideUserPosts();
    hideQuotesFromHiddenUsers();
})();
