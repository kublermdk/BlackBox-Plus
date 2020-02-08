// let $messagesSection = $('#m-content div.page div.top div.text p');
//
// let authToken = localStorage.token; // Get this by looking at an existing request.
// if (!authToken) {
//     $messagesSection.append('<h2 class="btn-outline-danger">Unable to get your authToken. Are you logged in?</h2>');
//     throw new Error('Error, invalid auth token');
// }
// let imageUrl = $('.m-topbar__userpic img').attr('src'); // e.g "https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3a-592c349ae72d/W/avatar?1577006745917" -> 5afd6163-a82a-4079-8e3a-592c349ae72d
// if (!imageUrl) {
//     $messagesSection.append('<h2 class="btn-outline-danger">Error - Unable to work out your Blackbox UserId</h2>');
// } else {
//     let userId = imageUrl.replace('https://portal.blackbox.global/api/member/', '').replace(/\/W\/avatar.*/, '');
//     $messagesSection.append(`<p>Your Blackbox UserId is ${userId}</p>`);
//
//     let collaboratedProjectsListResponse = await fetch(`https://portal.blackbox.global/api/member/${userId}/collaboratedProjects?index=1&limit=100`, {
//         "credentials": "include",
//         "headers": {
//             "accept": "application/json, text/plain, */*",
//             "accept-language": "en-AU,en;q=0.9,en-US;q=0.8",
//             "cache-control": "no-cache",
//             "content-type": "application/vnd.blackbox.v1+json",
//             "pragma": "no-cache",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "timeout": "8000",
//             "token": authToken
//         },
//         "referrer": "https://portal.blackbox.global/footage/marketplace?clearCollabMarketPlaceEntries=true",
//         "referrerPolicy": "no-referrer-when-downgrade",
//         "body": null,
//         "method": "GET",
//         "mode": "cors"
//     });
//
//
//     if (collaboratedProjectsListResponse.ok) { // if HTTP-status is 200-299
//         let collaboratedProjects = await collaboratedProjectsListResponse.json();
//         console.log(`There are ${collaboratedProjects.list.length} marketplace entries`);
//         $messagesSection.append(`<h3 class="" >There are ${collaboratedProjects.list.length} marketplace entries to be cleared</h3>`);
//         if (collaboratedProjects.list.length > 0) {
//             collaboratedProjects.list.forEach(function (element, index) {
//                 $messagesSection.append('<p class="" data-projectid="${element.projectId}">Clearing the Marketplace Entry #{index} ${element.projectName}</p>');
//                 console.log(`Clearing the Marketplace Entry ${element.projectName}`, element); // Console.log doesn't actually work, they've set it to an empty function
//                 fetch(`https://portal.blackbox.global/api/member/${userId}/project/${element.projectId}/clearCurationProject`, {
//                     "credentials": "include",
//                     "headers": {
//                         "accept": "application/json, text/plain, */*",
//                         "accept-language": "en-AU,en;q=0.9,en-US;q=0.8",
//                         "cache-control": "no-cache",
//                         "content-type": "application/vnd.blackbox.v1+json",
//                         "pragma": "no-cache",
//                         "sec-fetch-mode": "cors",
//                         "sec-fetch-site": "same-origin",
//                         "timeout": "5000",
//                         "token": authToken
//                     },
//                     "referrer": "https://portal.blackbox.global/footage/marketplace?clearCollabMarketPlaceEntries=true", // Added a query string so Blackbox can track these queries
//                     "referrerPolicy": "no-referrer-when-downgrade",
//                     "body": "{}",
//                     "method": "PUT",
//                     "mode": "cors"
//                 });
//             });
//         }
//
//     } else {
//         $messagesSection.append(`<h2 class="btn-outline-danger">## Error ## Unable to get the list of projects. HTTP-Error: ${collaboratedProjectsListResponse.status}</h2>`);
//     }
// }
//
// // Example collaboratedProjectsListResponse JSON: {"list":[{"projectId":"3f213ead-c68a-4ca5-b2fb-6e73002eeb98","projectName":"Mexico Timelapses","projectLocation":"Mexico city","projectDescription":null,"memberId":"759f0772-e614-43db-af26-082eee770f23","onBehalfOfId":"759f0772-e614-43db-af26-082eee770f23","documentId":null,"colabId":null,"uploadType":null,"contentName":null,"pathName":null,"rushOrder":false,"sharingPercentage":20,"reviewRequired":true,"reviewState":null,"submitOption":"marketplace","selectsStatus":false,"gradingStatus":false,"otherProcessStatus":false,"exportClipsStatus":false,"metadataStatus":false,"notes":"Looking for people how want to make metadata work for mexico city timelapses","projectType":"curation project","projectStartDate":"2019-12-20T20:49:36.000Z","projectEndDate":null,"topic":null,"detailSummary":null,"selectCollaboratorsType":null,"numberCollaborators":null,"curationCompletion":"no","status":"available","createdAt":"2019-12-20T20:51:03.000Z","updatedAt":"2019-12-20T20:51:14.000Z","deletedAt":null,"Collaborators":[{"collabId":"0bdb52a9-8d0b-4a2e-b012-e01a9a05954a","memberId":"759f0772-e614-43db-af26-082eee770f23","collabMemberId":"c756f42e-2c12-4190-937a-44032b8a56f0","collaboratorName":null,"footageId":null,"mediaProductId":null,"projectId":"3f213ead-c68a-4ca5-b2fb-6e73002eeb98","collabShare":15,"collabType":null,"approvalStatus":"cleared","ownerApprovalStatus":"approved","sharedContent":null,"createdAt":"2019-12-20T23:27:58.000Z","updatedAt":"2019-12-20T23:27:58.000Z","deletedAt":null,"Partner":{"fullName":"Jon Hulme","firstName":"jon","lastName":"hulme","thumbnail":null,"email":"jonmhulme@gmail.com"}}],"pageInfo":{"totalRecords":16,"totalDisplayRecords":1}}