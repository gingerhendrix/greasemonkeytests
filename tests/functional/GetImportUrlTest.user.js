// <?php echo $header ?>
// ==UserScript==
// @name         GetImportUrlTest
// @description  Tests importing an image
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../../GMTest/js/Test.js
// @require       ../../../GMTest/js/AbstractTestRunner.js
// @require       ../../../GMTest/js/SimpleTestRunner.js
// @require       ../../../GMTest/js/GreasemonkeyTestRunner.js
// @require       ../../../GMTest/js/TestManager.js 
// @import 	image ../../lib/image.jpg
// @import 	text ../../lib/test1.txt
// @import 	shift-jis-text ../../lib/shift-jis-text.php
// @import  shift-jis-image ../../lib/japanese-text-image.png
// ==/UserScript==

new Test("GetImportUrlTest", function(test){
  
  testImage();
  testText();
  testIntlText();
  
  function testImage(){
    var url = GM_getImportURL("image");
    test.assert(url, "import does not exist");
    test.assert(url == "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz%2F2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz%2FwAARCADSAOUDASIAAhEBAxEB%2F8QAHAABAAMBAAMBAAAAAAAAAAAAAAUGBwQCAwgB%2F8QASRAAAQMDAgMFBAcEBwQLAAAAAQIDBAAFEQYhBxIxE0FRYXEUIoGxFSMyQpGhwTNSYtEWFyQlQ%2BHwCDQ2kiZFVWRyc4KistLx%2F8QAGwEBAAIDAQEAAAAAAAAAAAAAAAQFAgMGAQf%2FxAA2EQACAgIABAMEBwgDAAAAAAAAAQIDBBEFEiExIkFREyNhcQYUMjNCgaEVNFKRsdHh8SRD8P%2FaAAwDAQACEQMRAD8AvFKUrsjjRSlKAUpSgFKUoBSlKAUqOvN9g2OKXpjwSSPdR95XpVUgT9d64llGnbb7HCO3tDqcAfE%2FpUa7Krp6SfUmUYVt65orSLy8%2B1HbK3nENoHVSjgVDyNZadirKXrvGBHUBXN8qi7HwZdvepJkLUd8kSFxcFZYUcKJ7t6n7xwX0XZJ1pQiI%2B6mS%2F2bnavk5GPLzqrlxSbfgitfEtocHhvlnLr%2FAO%2BZF%2F1g6W%2F7ZZ%2F5Vfyr3Ma40zIc5G7zGKumCop%2BdW64cFNDN2mQ41ZAHUtKUkh1XUD1quaZ4HaPvunWZUmPJbecyCW3iMYNYftO7%2BFGa4TQ03zP9P7HcxJYkthbDzbqD95CgoflXtqm3ngZ9H6lZg2O9yYinkFbS3FHfA3G2POue5WzidodPbTkIvVva%2B04kcxx69fxrfXxRf8AZHRot4O0t1S38y9Uqt6Z1vbdSDsk5izB1jun3vh41ZKta7IWx5oPaKW2qdUuWa0xSlK2GsUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBUVqC%2BsWG2qkOe84dm2%2B9RqVqj3C0zdacQW7VEKQiIjnUpX2U%2Be3nULNvdNe13ZOwcdX26l2RwwdI3PVV8jOXJ1Spko86WMHDCP4h6dK%2BiVGJpfTWcBLUZvAHTJri01pWFpaGtxbvayFjL0h0jf49wqtT5b3EDUCbfE5k2eMcuujbn%2F1iuc7vqzrVFPwx7ImNAwXfZJN2kAh%2Be4V79ye6vHWC0vaksMUZJD%2FADkf69KtrLLcSMltACG2048AABVNtKjqLXMi58v9lhp7Jo9QpXfXu%2Bu0INOTl5Iua2%2B0jqbx9pJH5VU9ByCwmfaHThyG8QAT1Bq4VRb3%2FwBHNdxbrkiJNBQ94BXQH5Vikm%2BphX4tx9SV1ilUVuHeEDJgOZVj91WAamnUM3a0rbCgtqQ3jI3G4r2SI7M%2BE4w8kLadTgjxFVnTEp20TXNPTlYU0eaOtR%2FaIPcPHFYpPYXijrzRm9w4VQL45JMFSrbqCColPIrAc8CPCvHTF2kym3rdc0Fq5QjyOpO3OOnNWp6msMiS63dLUoN3Bj4B0eB8ayHU97aY1tAuKorkKW8oRZqFowN%2FvCpePa6rFKPbzPMqiOZS0u67fP8AyWmlKV1BxD6ClKUApSlAKUpQClKUApSlAKUpQClKUApSlAfijypKj0AzUNwtvFst151FdblJQysupQgK%2B0Rudql3ziO4f4T8q8eD%2BlLXNtUu6TYbb7y5KggrGQAKpuKfhRe8J0udv4E4%2FJu%2FEBfs8VDlus2cqdWPed9PiKulptEOywERIbQbbR%2BJ8ya7EIQ0gJQlKEjoAMAVVb9qpxcg2mwp9qnq2UtG6Wh4k1T%2FAARduTn4YroeGrLy9LkJ0%2Falc0qRs64no0mpy022Pp%2BypYRshpPMtR6k95rk0zplqyR1Ouq7ea97zrx6k%2BHpXq1hcFNwEWyMcyp57JIG5APU015I96PVcTy0nqb%2BkbczmbDa47pRt3juNSN8s7F8tTsJ8YChlKu9J7jVZt1uRpC8xEpymLMbDbqz07UdD8au1eP0FqUZJxKto%2B5vpS7ZbhlM6H7pKvvp6gj4VJ3%2BxovEZKm1djMYPOw8OqVfyrh1Rp96apu52xQauUbdJH%2BIPA%2BNdGndSMXlpTLgMeazs6wvZQPjjwrLv1R6%2BvvIfmeqwaj9qeVbbin2e5M7KQrbnH7wqI4qWOLP0XNl%2BzIVIjJ7VLnKOYY86n7%2FAKbj3tpKwpUeY3u0%2BjZST5%2BIqjaov19tWlrlarxbXZYWwpCJbKfdIxsTWLW0ZQSm9w6P0I62Ol%2B0xHT1cZQo%2FFIrqqG0k8X9KQFnIIb5cHuwcVM11mPLnqjL4HF5Vfs7pw9GKUpW4jilKUApSlAKUpQClKUApSlAKUpQClKUB6ZZxCePTCFfKv3hlq2BZdFtsOR5ciSp1auzjsleTmvVdF9naZSz3NKP5Va%2BEkdtPDq3OFtPMsKVzYGT7xqi4o05xizoOEpKEnL1PBS9VatcKA2bJbCdyoFL6h%2Fr51Z7Jp232GN2URr3z9p1WCtXqalOlQ1z1PAtyg0lRlyVbJZY99WfPHSqvfki4cnLwxWjvuNwj2uE5KkrCUIHTvJ8B51B2G3vz7i5fbk3yuuDlYbI%2FZo7tj0NfsS0zrvMRPvYSlKDlqIk5QjzPiasoAAwBgCvNHj1BaXc47rbGbtbnIr2wVulQ6pV3EVEWS8uRpH0Nd1hE1rZDitkvp8QT1NS8S6wZ0uTGjSEOvRVBLqUndJNei9WKJfIwbfBQ6jdt5Gy0HyNNnkXrwy7EnUBfdKx7q4JcZxUK4I3Q%2B0eUk%2FxeIqORerxpjDN7jqmQxsmYyOZX%2FqFWO3XeBdWQ5ClNPpPclQyPUV72MuWcPFHsVUaovenF9hqC2OSWE7Jlw0FYI8xXvvWrrBdNI3INXGNzrjLAbcUEqzynbB76t6kpWkpUkKSeoIqran0hYpFknvm1xg%2BlhakrSgAg4O%2B1ePWupkp1ye5LT%2BBl2h3kvaZRykFKHVpGPWrFVa0GhLenVoQMBMhY%2BVWWuow%2FuIfI5LP%2FeZ%2FMUpSpRCFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoDgvagixTFHcdkr5VM8ObRfnND29yJekx2HG8oQWQopGTUFqPbTk7fH1RqS0BxO0ra9HW%2BBNnmM%2Bw3yLC0HGcnvrn%2BJv3q%2BR0nCtqptev9i4HSVxlL%2FvHUk19o9WmwG0n8KmrZY7daEkQ4yGiequpPxqtr4uaJQgKF7aXnuSkk%2FKuCRxr0u2MRWbnPV3CNEKs%2Fjiqt2x9S1bsktGh1VdYawbsjYt8Epfu0j3Wmgc9n%2FGrwFVKVrrV2pElqy2j6HirGDImgh4D%2BFIOxrwttmh2ZSpM2UZExzdyRJcBUfie6tbs%2FhEa9faIZFtvmkp7eorS4qa4oEzoxz9dk5JHn1rTdK69suq4w9mkJYlj7cV5QS6g%2BaagkXOC4eRuWwvyS4k5%2FOoa76Qtl2ke0tpXAl9RJhkNuepIFE9djZKKfc1tSQpJSoAg9QarVz0LbJjvtENTlslde1jHlz6iqHGe4i6fTyQLrDvUcdBcuYuf8yTXc3xK1hCJFz0gh8D70F7m%2FI1nzoxjCcHuDJhyza7thJg3pme2OiZCfe%2BX61xXOVxCes0wSIkBhkMr7RWdynG%2BK9I40dmcSNG39GOpQwFD51x3vjNBlWGdHGmdQtqdZWgKXEASnIxknmrL2kdG3c19qCK1oEOjTzvbY5jJcO3htVnqp8OZYm6YW4EKQBJWnChg9386tldTh%2FcQ%2BRxmf8AvM%2FmKUpUohClKUApSlAKUpQClKUApSlAKUpQClRd%2FvCbNbu2Ce0ecPZtI%2FeUelVdi1a7uwVKj3mNHXzZTHCknA8D4VXZfEacR6sLDG4fbkR5o9EWbU6uXTU0k49ysYblyEshIuctlKdglDPMkflVv1Bq68223SrRqC1lEhSMJeZ%2Byvz%2FAPyqxZeJF7hJYtkCFGkEe42FIyo1SZOXVlSU6ntaL%2FAoljQ5bPUs2gZt4k30R3YiJ0HGVvvRQhSdjjBxvvWyR2G2R7jLbWRuEpArG5%2BteIlpjiRKtkaO13bD8hnNcf8AWZr5UUP%2FAEcA2e8skfhVfzwb8LRZN7N4Cve3IyPzrFNc2DUrt4fkyo786GonsxHWSAPDlqOhcRtfz56ozEVC3kjJaW1ykjyBrkncYNZQn1MyGWGXEHCkls5Fe7W%2FI8TcSORaH3F8kOy3dMj7qkoUnHxrZ%2BH0O%2FQ7Elu9LUp3J5Q4rmUE%2BBPjWVWzivrm7vKbt8dEhaeobZJxXtf4r63gP9nKiIS7%2B4po5%2FCtjmk9PRk5cyPoDoOYkYFZpxQu%2Bo4MhtMBciPAKd3IycqJ781TkcatUpb5zbmXUfvdmoCpKFxa1VcWAtnTLctvvKErIrxyWup5EqiNWX9lYMfUF3W53IW0VAnw6Vq8K9XS5cMpUq7MqZkGOsHmTyk7bHFUyXxdu9pdBmaSZjOdRzBSc%2FlUdduNky82p63qtTLAfTylSXDkCicX2Rk5F24ZZ%2FomsnvkuH5VcKyLS2vhbLExaoNvdn3BbhVypHujPmKucOJr25JDrj1ttvNuGlJ5zjzq6hxTGxaYxsfY5q%2Fhl990pRXTZaqVEWi5y3ZT9uurLbFwY3IbPuuJ%2FeTnuqXq3x8ivJrVtT2mU11M6JuFi0xSlK3moUpSgFKUoBSlKAUpSgIjUjV3ctvNZnw1IRkkYB5h4DNZrH17qyJNXGe9nedScdk8kIP4ithrPuKcGO5DivhlPtLiintO84AxvVXnVzj72EmvhstsCcJv2U4p%2FHRXp%2BobtqK5OJlxERFQ4jjqUoXzDmA61erLpNuRpuBc7Q8qFcuwQorTuHTjJCgfE99ZjpVD0bV7TFxUVNy2jGCj0PNsK0iBbp07TU3T6g429CUexIB5XEDoM%2BfSuM4vOT67%2FmdRjwcFy60iv8QdVCZYBAuDKG7lHc5XB17uoPgaqvCO3tzNbGWsAojNlXoTtmpnWP0U7pRgs29iNMaWUPpSnCkqA7%2B%2Bq%2FwtvLNr1klp1SUNSkFvm7s91RcOK9lLl7mdiW0a%2FB01K1heHLu5PDEdtam46Q0F8oG2Rnbc1c4elrVaSZkgKkyEDJffPMQPIdB8KrGl7ojT14fss09k06suRHDslQO5GfEGrpdIiLtZpENKwO2bKObwzXuJXDk8S2ybCKejO9Saq0jqaSYMKSUXpnJjO9kpOVDuzjeq3qfSi9b6di3W1xyuefceQMDmxtnfzql3bQ%2BoNPanTIcinlbdyghX2z3AeNbxoOzu2rT8Vp9OHccyge5ROSK8z5qmCsi%2BqPbGpPkaKbZtLv6OtkezwOVmdOQXpMtW%2FZpHUirRo9rRJmOMW%2BSxPuKd3XXAStR8d%2F0rh4lMP9ugHDbUqOqOHO5Ks5SM%2BdZ3w34e39vXbNxfirjxIxUVOK%2B9kHAHjWjh8%2FrO7bO5hFKC0kbfN0ZbZPOuHmA6r7RaSClXqk7VTV6dn6I1HFmNS2noE13snW0I5MK7lY6Vp6EhCAFHcVS9VTmb3foFoirS8Y7vbSCk5CABsPWrG6qtp8yNyW%2B5UuNcZl2yQ5JSOfKk578V8%2BBPNJ5RuM4rb%2BNV2ZS1GtiSCtpJWv491Yey2p6ahDW61KAHrmo%2FCo6qfpsr7316G72FuHp6FGtOm4aHr3KaSt59X%2BECBlR7tjjapO%2BaXXZba1dpdzkyLup9ASvmIBJO4CRtiqzpa6XXQ9nckStOvPvOrJXIWsDmzjAH4Vp0VMbVFsg3e5Q3IqmEdsGlq2Scd%2FpVbnOdc%2BbuvNm6vtoq2obvFs%2BuLbKnvpYbEZSVrIPf0%2FOpBrXemXlcqLxHz5kj51nl%2BmwtQ6kmTJPZmG2ezbCzgYFV2fcdNx0lqHbmpC%2BmeXAzXW8ClfTjeHST69Slz8eq61OW9r0%2F0b1FutvmgezTY73N0CHASfhXXWN2jhPOuig%2FcixbGFpCg2x7y%2F5D861Kw2RjT9pbgRnXnW0EnmdXzEk11VNl03446Xr%2FAIOdyKqYfdz2%2FT%2FJJUpSpRDFKUoBSlKAUpSgFUXieB9HwVYOQ4f0q9VReKAza42%2F3lfpULP%2B5ZP4c9Xoyi9XpwzWxGWoGOoKSofvDvrbOHHEiHfoTUSW8GZ7aQlaVnHPgD3h6185y1crq%2FHJzk1z86myFpKgfEK3FcllY6y6%2BSR1que9n0hxctkBemlTGWGg8pwFa0gZVtXzm4tTMgLQpSVJVkEdxFe1d3mOo5HpbzrYGAlSyRXMWlutqdbyUIOFb7DPSoeFgyxU4N7MrLVPyNWsnE%2B2XSyfR2qI4eeaH1T2%2BCfUbprth3jUj7YTZbpNQ2dkpEppaR8Vb1jBQ6EBZSeRWwONq8EqWnooitssGMZOcHrYrvce5vNstcmJeGr5rDUqQuOeZDPahw%2FHH6Vc5HE22s26LItkd64NvuKaCgOTBHrXzVpazP6m1FGtySrlcVlxQ%2B6nvNfWNs0xbWtPt2tyMhcYICezP%2ButUfFK4VxTulv4LoSYWc7M9vfEF%2B8vqa%2Bjgu1NqQ3IakIIcHMccw9Km48C%2FWVKW7BfmXm1jmRDm%2FdHkeuKtkTTdotUVbXYAskgntl8w26DJqI1po2Fqa3GTDWG5zSfqnW1Y28OtVdWbVW1GlOPxNq2upULtM4oTFlqQ22xF%2B97E4gE%2FFR2qIi6yGiGX0vxoyHlj3Wg92rileK1Dassvsy9QpTkSTOknlOOVThqvqcWo%2B8o58966ivGnfH3klp%2Bn%2BzRPKa6E3qHUEm%2F3R2VIWpRcVnJrx0ywmRqq2tKVjnkIGSdutRTDT0h1LLQLjiugT1NTFugIjKW%2FdAtpCB7iR9oq8RjpVnVRyx5K0Q5Wbe2fRjenp97vyJF15E2uEAY7QWCFqH3z4VC8TeIEO121dmtzwLyhhxSO7yrFZetb4pgxWbtL9lHupQpedqr7r7jqi44sqJ8TVL%2ByZOzdr6LyRIWQtdDtdnOPyEh5a1NBW6Qask5iEi3RPZUBCXFpOfjVLC%2FAirFp532y42qE9lbKpjaSnpkFYyKvqlrwI1xsUdykj6gpSldkcEKUpQClKUApSlAKUpQCqFxTbLlshoBxzLIz%2BFX2qTxMGbXC2J%2BtPT4VCzvuGT%2BHP8A5CMHnsliU42pYUUk9O%2BuAk7jON6mr4ytq4OBSepKsetQjmRsMenWua6x7HVWLTPzHXJwOldluniEpSHBzsPbLH6%2FCuLYkbjz3r8Oc7DIrNPT2jW1zGmaatcVdmLanESGXDzJGMYrivGh4iWHJMd8sJQOblUOb9arGntQu2eWAs5jrPvJPd5itDvUsPaZfcZUFJUkbp8M1eY%2F1e%2BrlmuqINqnCW0yc4FadbajyLqvCy6vs0nl%2B6P862159mHCckPKCW208ylHoAKzrg2htOiopGMnmJ9eapvWPtdzlw7Iw24GJB55DienIO7418p40%2Fa5bgn0Re42uXZGNQ3OIM9cu4pcatLSiI7GSA7%2FABkip2xaRY07PlKgrLUJ0pUhjJPKcb9TU3b4bUGGhppISlIAAxsBVX1%2FrmNpa1qQh1Lk50Ybb8O7Jqr9rZKXsaexvb11ZhXE2ObjrSamC0p4lzogZ7hUbatBOuNKeuS%2ByBGyR93zJq2WSK9hybLz27551g91VrVmqVrJgxF4bzhSh1PlX1HheCqseMr32KW%2B9ynywIp16Fpx5xMB32iUdi8RsPIVBypjsp0rdWpSlHrmvQtSio8xzmvwADOKyst29Q6IzhF%2Fi7n6DkZzX4rIA60BI2JwKZwdzWr5mYQOZYGcZOBtVwsVoXB1NZFKXzlyU2rpjHvio6x6bkTnGH1gJYznzPwq3BsM6wsSAOkhH%2FyFZ1we0zbGluuUpLyN2pSldYcGKUpQClKUApSlAKUpQCqZxKH9zRVb%2B693elXOqlxF%2FwCHmjnBDw%2BRqHm9aJfl%2FUm4H7xH8%2F6MosuG1MhuIUkFa04B76zS5Q1RJS21jdJINaqjJQnbJxk71W9V2jt2%2Fa20jKRhW%2F51TuHNBaO%2BlUp19Cg52GSBmvE5A%2FPrXucQUrI6%2FGvWRtsRnvAqH18yra0zwQQOX%2BVWiwXBz2Y2ySr6iQnDSieh8KrPJvn9atka3mVpRtxAy60CpJHdvWVblGW4nsa1Z4TQeFWtYWn%2Bax3dxMQpWS0tZ2Vk9Ola%2FI1lYYkTtn7nGSkjOefJ%2FAVgVrjwNQ2ttc1lClpHKTzYVkbV0I0dY0r5uRxSfAvGoOZ9Gf2hP21ctbMY5ap8E0XXVPGqMQYOmULmSFbB3BAT6AiqRBtM65Tjdb0suyVnmCVHITUxDt9ut6CIzbbQ8sZrr7ZoJJ7RHL1xzVccL%2BjFGH4pdWRbs9zWoFc1Xc1RYqIEYjt3tsZ6Cs8vEQRJXISSoAEnPfirZDP0vqOVMczhsgIz3bY%2BVVrUigq6u955u41JzrOZ8seyJOJRqtzkQale919M1%2BDuAryOxz%2BtD1OQPiaqj3zPA9f8677Tb13KehoA8oOVHwFcrLCn3ktoQSpRwB41pGnrMi2whkDtFe8o%2BdZwg2%2Bptprc38CQhx0sNJQgYSkYAr0NgK1xZBj%2FAB0%2FOpEDuGwHnXFFHLr2yZH%2BKO%2Bpbi1otro8tEl8Da6UpXRHy4UpSgFKUoBSlKAUpSgId%2FVlijTfZH7mw29nHKo438M9KhOJQC9PR3Ar3Q6Dkbg7VTdZWJELUTqZbeY0k8yHcYx8elQF0n3qHbGra9IU%2FBQrmbJyeX41R3ZcpRlVNHTYvD4c0bqntIsLak9mCCVbV5OONpZWXgOzA97m6VyNP8lsU8Rnlb5h5nFREbU0SUVx5qOy5sjfoa1QklFHVwajFbZX75EhB8uw5La0KO4HcahCjfAO1X2zfQ9kv6H7nbmbtaHiA4AcqR5g5r6GtfCThlqe1NXCBbUOsPDmCmnj%2FOoVkmpPoV%2BQkntnx4v7Y2xvirzZnkxdKpccO3Kd%2Bo6mts4gcENFWXRk25QYchqSyE8hLxI3UB09DWApQ7dXWLTDQpDDX21HfFY1y1LWuphTKMPFs2Xg9wlseqNJC632M%2Btx9xRb5HSgcgOBsK5%2BKnC6y6VlQXrciS3EkAoKS%2BpWFCoC3Rrvb4SI8XUdzjtI2Sht3lA%2BFcuo2bxJtKnHr9cJojntA287zCpn1PMa5lH9SPLJqc9t%2FoNF6Igai15DtbvbKiBCnX%2FrT0HQda3SRwM0OIbvJbXu0CDyn2hec49a%2BdtPsP3Z5yYqRKiEEJSph0tkjzIqyi3SQDi%2F3kZ6gTVb%2FnXscTJu8UF0F2RSmtPX5FetsVu3yZUdCeXkcxg1RL0vNxdyR9o%2BtWtObHqB6M%2Bpa23iOVbis%2Fn8a69I8M5%2FEe6zmrdKixvZlArL2dwc9AB5VqnXKpcs%2B5LhbGdO4szYnHXfwNfgBVhIBJJ2rfx%2Fsr3s%2FavtuHolz%2BVUnWvDaLoR9thWoI8yfn9lHQcp9c99Q3JLuR4rmI7S9gMdtMuQj61Q90eA2q2coTkAH8c1WLOt22NBVylft1AoSs7irM0tK8KScoPgdqn061tFxjRio9DyyNtsVHNZ%2Fp7ZCCR9cB4d9SORnYfhXFH%2FAOPrL3jtR3VufkbMle6l8ja6VxTrzbbaP7dPjxts4ccCT%2BFV5fE7SyJaWDcOpxz8h5fxq4nkVQepSR8yhi3WLcYst1K%2FELS4hK0nKVDII7xX7W8j9hSlKAUpSgFRd%2F1BD09A9pllRzslCRuquyXPiQGu0lyWmEeLigms%2B1vq7S10hGCXnZTyQS2uOMhJI%2FMVHvuVcXppMlY1DtmtxbRHXzidYb3b3IU20TOQ%2FZWkjKT4iqfbr5HlKMF9ta2lnlQT4V4276SXIQlMYKj52U6kZxVlRGYThfs7Yc8Qn%2FKqFzndLml3OzwsVVL3fQ%2FOwaVD7FoYRy8uD3bV79FXfTERt6waqsS54U6VMOsIy4Ae7bfzr86bYxXBcraqSpEqMosy2SFIWPLes7K%2BaPKi2lHmjpFmvOh%2BHMpCnLddbtaFkfsnozix8qvHAmymxybhHj3WbOhKAWjtIqmmwfIq76qNn46X2Chi13O3Qe1HumZIBCfUgA1af6xLYlDdwv2uYjwZIWiBaEFIUe4KJ3NVMtx6FZJd1otnGO23u5aVLdulx40NIKpJdPLnBHLvXyzFcvVrjqejrYS1n7RAOavev%2BK9y1utTDAXAszf3VHCl9Ovj0pw64ZXHiDPblT2nYlgZPmkveST6jettbcZe0izFQSjqfYjtN2niHquAZtohNPxwoo5yAnJHXr1qUd0JxXDSg5Z2VNgHm3TuPxr6htdqh2a3NQYLCGGGk8qUpGK98reI8M49w%2FKpf1y%2FX22Q3CpvpE%2BRdOaf1%2FekPJtVpjqajrLa9wAFCrGjh3xUcUMwITeO8rFaTwSIMS%2FADITPVv8K1OvK87IS6SPZ1Vp65T4l1VbtTR7ubVe47DclrYDGOoB69%2B1Xz%2FZ0edtOu7jb5LiOaRHSRvnJSe74Gti4n8O2NaWnto6UouccZaX05umx%2FDavmqJcp%2BjdaRLo4ytMmA5yvtkY5k9D%2BVabLp2v3j2SKoV8uktH1BxJuuorbpwp05bXZkl7KVLbGS2PIV84wOGnEK%2B3NyU9alwi4r35U5QASM9cGvpOHrhm86ZZuunWE3gkAuMNOhK07bjfvrPZ0mwzpy39UR9XMEKKiw7zhkeXubEVHk9PZlWmumjMNYaQ0vprTvZv303i%2FKdHaLZOWmxg%2B6PjXPbcCG0kE%2FZHyqc4g6k09qG4QbPpqD2EOLgrJa5STkg5zv4dajG2uRIABGOg8BUjF5pSb2T6NuXU8k4zuMVB32BOmSmPZQBygntM45aniAR0PxpgkdCD0JqdJKS1snSjtaKwbFGiN%2B0XWUt5Y%2FeWcV16b07I1pcUIYjezWlpX1jvL1HeAcbmua5abmXB8rXNASTsk52Fd0BjUtmioYt1%2BWywk5S2BsPhWmMIxl1j0K7IrtUXGhdfVm5stJYYQ0j7LaQkegrzrHG9W63g5KpkSWgb4cbwfxFX%2FRmrRqqA6tcVUaRHIQ6nOUknvB%2BFXlOXCx8mmn8Ticvht%2BOnZPqvUslKUqYVhV9V62j6aPY%2BzrfkEZA2CRnxNZrcuJl9ueUJfags9PqkkKPxzW0yrbBnEGXDYkEbDtWwr51yHS9hVnNlt5z4xkfyquvx77X0npFnRk49UVuvbMEXcIMpfaXGXOlud%2FaKyD%2BJroZvlpjnDUNwY22bBNbl%2FRawZz9CW7I%2FwC7I%2FlXsb0%2FZmSC1aoTZH7rCR%2BlRVw2a68yLKPGq49oGIo1N2hKWrdLc27m69qJl9k%2F7tpy4LHd9Qo%2FHYVuyIzDYwhltI8kgV7K3wwrF0lP9DKf0gl%2BCJhrMHWUlf1ennW897qSn51II0nriQR%2FZYUffPvL6fOtipWxYK85s0Pj1%2FkkZA7wz1bOTyyZtrA8yo%2FJNRV14YPWWIqXcb1BaOPdSkHKj4AEDNa7qS8u2S0qksRVyXTskJBIB8Tis1tmoHXrv9K3jT8%2B%2BSkH6qMtklhA9Kr8qumnwpNyJGNlZOT45tKJLcLeCs3Urzd01Ap9q1oOW2V5Sp3r3EdOlfTDTdvsdtQ0ksQojKcDJDaEj8hWGq4i8TL0z2NrsUCzMYwFuZSQPLJ%2FSoO4aQ1ZfIbzl%2B1NJlvBOUMNOq5CfDf%2BVV8abZdYxbJtl9aaU5o1TU3GrTlmkewW5arzcFnlbaiEOJKvDIPyq2w502RpL2y4x0xpKmCtbaScJ2r5d0hYdTaXv65sPTbMuQn9k7MUORr%2BIbjer1Lc4kaiy1db9GtkVYKVNQOYHHhXkaLpvwxZ5OyiC6yS%2FMtXAxQXDvyh0VOJznyr26m4rz9Eaqdh360l22rOWH4yTzcvnzHB%2BFUSDpC%2FaZKnNNaolsrWrnW2%2BfcWfE4rn1lK19f7OId2tFruRa3bkxshwfif0rGWNfUtSixXkUWvwyTNy05r7TeqWUKtl1jrdUP2CnEh0eqc57qqvFPhczqqKq521tKLm0nJAGzo8PWsm07w59ssjcua2%2FZ7oFKAcjuYURnYkd1TcWTxR0sf7uvLd5jp6NzFqWrHx%2FnW36rdyKTj0MFkUqxwU0mjLCu42K7LZitXO3zUHC0xCpJyP4a65OsdTvoLE6%2B31DJGCFgjIqx6q1NfrxKROk6Vdtt1aP8AvUJtQCvXrmrbo7UkrU0Bbd0tjzLzQwpbjRDa%2FTPf5VhRT7afs5dGSb8lUw59bMnt9ytMQnmdeU4o5Ut0bqPnUo3fLadxMb9CoCtcd07ZXyS7aILhPeqOg%2FpXI9ojTL%2Beaxwhn9xoJ%2BVXEcC2H2WiHD6QVx%2FAzMxcoB3Etk5%2FjArz9tikj%2B0tHPgsVd3uF2lns%2F2Jbf8A4HSKjFcGtPk%2B7Kno9Fo%2F%2BtY%2FV8leS%2FmS4%2FSDHfdMrqnmeUpS6gk9NxtUJLTfAgmPJjLHcE9avTvBu0lI7G5z0K8VFCvkBXp%2FqbjpVlN9lJH%2FAJY%2FnWE8bIf4f1Rm%2BOYsl3a%2FJmYsrfVPSm%2Fuz2omffMcb%2FntWxaMv2jLfakQbXcmmcnmUJSwhxSj45xmotXB1CkhJv8AJUnwU0Dn%2FwB1etXBSEr%2FAK3cB8QwB%2BtKKcqmXMob%2BbRW5mZiZUeWVj%2FX%2BxpyVJWgKSQpKhkEdCKVH2G0CxWZi3iU9KDIwHHTv6elKvIOTinJaZy81FSai9okaUpWRiKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUB%2F%2F9k%3D",
               "uri not correct - '"+url+"'");
    test.log("An image should be displayed below: ")             
    test.log("<img src='"+url+"'></img");
  }
  
  function testText(){
    var url = GM_getImportURL("text");
    test.assert(url, "import does not exist");
    test.assert(url == "data:text/plain;base64,VGhpcyBpcyBzb21lIHRlc3QgdGV4dA%3D%3D",  "url not correct - '"+url+"'");
  }
  
  function testIntlText(){
    var url = GM_getImportURL("shift-jis-text");
    test.assert(url, "import does not exist");
    test.log("Shown below is some text and an image of how the text should render");
    test.log("<img src='"+GM_getImportURL("shift-jis-image")+"'></img");
    test.log("<iframe style='height: 50px; width: 200px' src="+url+"></iframe>");
    
    test.assert(url == "data:text/plain;charset=shift-jis;base64,grGC6oLNg2WDWINngsWCoILp",  "url not correct - '"+url+"'");       
  }
  
});

TestManager.runner = new GreasemonkeyTestRunner("GetImportUrlTest");
TestManager.run();