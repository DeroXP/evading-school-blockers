javascript:void%20function(){const%20a=document.querySelector(%22%23stageFrame%22);if(a){const%20b=a.contentDocument||a.contentWindow.document,c=b.querySelector(%22.main-container%22);if(c){const%20a=document.createElement(%22button%22);a.textContent=%22Copy%20Text%22,a.style.position=%22fixed%22,a.style.bottom=%225px%22,a.style.right=%2210px%22,a.style.padding=%2210px%2020px%22,a.style.backgroundColor=%22%23007BFF%22,a.style.color=%22white%22,a.style.border=%22none%22,a.style.borderRadius=%225px%22,a.style.cursor=%22pointer%22,c.appendChild(a),a.addEventListener(%22click%22,function(){const%20a=b.querySelectorAll(%22.question-container%22);let%20c=%22%22;a.forEach(a=%3E{c+=a.innerText+%22\n%22}),c+=%22\nPLEASE%20PUT%20THE%20CORRECT%20ANSWER%20IN%20BOLD%20AND%20ONLY%20THE%20CORRECT%20ANSWER%20AND%20NOTHING%20ELSE!!!!%22,navigator.clipboard.writeText(c).then(()=%3E{alert(%22Text%20copied%20to%20clipboard%20with%20instructions!%22)}).catch(a=%3E{console.error(%22Failed%20to%20copy%20text:%20%22,a)})})}else%20console.error(%22Main%20container%20not%20found%20inside%20the%20iframe.%22)}else%20console.error(%22Iframe%20with%20id%20\%22stageFrame\%22%20not%20found.%22)}();
