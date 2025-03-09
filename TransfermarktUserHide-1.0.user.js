// ==UserScript==
// @name TransfermarktUserHide
// @namespace https://transfermarkt.de
// @version 1.0
// @description Hide specific users from the forum.
// @author Lupus
// @match https://www.transfermarkt.de/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';
    const hiddenUsers = new Set(["username1", "username2", "username3"]); // change / add users here

    // Funktion, um die Nutzer zu verstecken
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
