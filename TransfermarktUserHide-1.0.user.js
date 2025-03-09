// ==UserScript==
// @name TransfermarktUserHide
// @namespace https://transfermarkt.de
// @version 1.0.1
// @description Hide specific users from the forum.
// @author Lupus
// @match https://www.transfermarkt.de/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';
    const hiddenUsers = new Set(["username1", "username2", "username3"]); // change / add / remove users here

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

    hideUserPosts();
})();
