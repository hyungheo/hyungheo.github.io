  var paymentDataKakao = {
    cid: "TC0ONETIME",	//가맹점 코드. 10자.	O	String
    partner_order_id: "5ABA43C3-1675-4D39-8ED7-F593B7066FA0",	 // 가맹점 주문번호. 최대 100자	O	String
    partner_user_id: "22CF5035-F912-497C-B636-60D06CB18EE9",	 // 가맹점 회원 id. 최대 100자	O	String
    item_name: "헐형",         // 상품명. 최대 100자	O	String
    item_code: "100",         // 상품코드. 최대 100자	X	String
    quantity: 0,	         // 상품 수량	O	Integer
    total_amount: 0,	     // 상품 총액	O	Integer
    tax_free_amount: 0,   // 상품 비과세 금액	O	Integer
    vat_amount: 0,     	 // 상품 부가세 금액(안보낼 경우 (상품총액 - 상품 비과세 금액)/11 : 소숫점이하 반올림)	X	Integer
    approval_url: "https://hyungheo.github.io/success",      // 결제 성공시 redirect url. 최대 255자	O	String
    cancel_url: "https://hyungheo.github.io/cancel",      	 // 결제 취소시 redirect url. 최대 255자	O	String
    fail_url: "https://hyungheo.github.io/fail",        	 // 결제 실패시 redirect url. 최대 255자	O	String
    user_phone_number: 01012345678, // 사용자 전화번호(결제요청 TMS 발송용). 최대11자	X	String
    available_cards: undefined,   // 카드사 제한 목록(없을 경우 전체) 
                           // 현재 SHINHAN, KB, HYUNDAI, LOTTE, SAMSUNG, NH, BC, HANA, CITI, KAKAOBANK 지원. 
                           // ex) [“HANA”, “BC”] 
                           //   X	JSON Array 형태
    payment_method_type: undefined,	   // 결제 수단 제한(없을 경우 전체) 
                                 // CARD, MONEY 중 하나	X	String
    install_month: undefined,           // 카드할부개월수. 0~12(개월) 사이의 값	X	Integer
    custom_json: undefined	             //결제화면에 보여주고 싶은 custom message. 사전협의가 필요한 값	X	JSON Map 형태로 key, value 모두 String
  }  
  Kakao.init('c4871a6a604aed6571230cb65b4febee');
  var tokenKakao = Kakao.Auth.getAccessToken();
  //tokenKakao = "3TCcXrPuDVnNG5EhyE7SX2-Z9tloqrwQUVjHDgoqAq8AAAFefa69sg";
  Kakao.Auth.setAccessToken(tokenKakao);
  console.log("TEST-Kakao: " + tokenKakao);
  if (tokenKakao == null) {
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      size: "large",
      persistAccessToken: true ,
      success: function(authObj) {
        alert(JSON.stringify(authObj));
        tokenKakao = Kakao.Auth.getAccessToken();
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });      
  }

  function payForKakao() {
    if (tokenKakao != null) {
      console.log("success getting Token " + tokenKakao);
      Kakao.API.request({
        url:'v1/payment/ready',
        data:paymentDataKakao,
        success: function(res) {
          alert(JSON.stringify(res));
        },
        fail: function(error) {
          alert(JSON.stringify(error));
        }
      }).catch(e => {
        alert("Fail to Call KakaoApi()");
        var auth = "Bearer " + tokenKakao;
        var form = new FormData();
        form.append("cid", "TC0ONETIME");
        form.append("partner_order_id", "5ABA43C3-1675-4D39-8ED7-F593B7066FA0");	 // 가맹점 주문번호. 최대 100자	O	String
        form.append("partner_user_id", "22CF5035-F912-497C-B636-60D06CB18EE9"); // 가맹점 회원 id. 최대 100자	O	String
        form.append("item_name", "헐형");         // 상품명. 최대 100자	O	String
        form.append("item_code", "100");         // 상품코드. 최대 100자	X	String
        form.append("quantity", 0);	         // 상품 수량	O	Integer
        form.append("total_amount", 0);	     // 상품 총액	O	Integer
        form.append("tax_free_amount", 0);   // 상품 비과세 금액	O	Integer
        form.append("vat_amount", 0)     	 // 상품 부가세 금액(안보낼 경우 (상품총액 - 상품 비과세 금액)/11 : 소숫점이하 반올림)	X	Integer
        form.append("approval_url", "https://hyungheo.github.io/success");      // 결제 성공시 redirect url. 최대 255자	O	String
        form.append("cancel_url", "https://hyungheo.github.io/cancel");      	 // 결제 취소시 redirect url. 최대 255자	O	String
        form.append("fail_url", "https://hyungheo.github.io/fail");        	 // 결제 실패시 redirect url. 최대 255자	O	String
        form.append("user_phone_number", 01012345678); // 사용자 전화번호(결제요청 TMS 발송용). 최대11자	X	String
        //form.append("available_cards", );,   // 카드사 제한 목록(없을 경우 전체) 
                           // 현재 SHINHAN, KB, HYUNDAI, LOTTE, SAMSUNG, NH, BC, HANA, CITI, KAKAOBANK 지원. 
                           // ex) [“HANA”, “BC”] 
                           //   X	JSON Array 형태
        // form.append("payment_method_type: undefined,	   // 결제 수단 제한(없을 경우 전체) 
                                 // CARD, MONEY 중 하나	X	String
        //form.append("install_month: undefined,           // 카드할부개월수. 0~12(개월) 사이의 값	X	Integer
        //form.append("custom_json: undefined	             //결제화면에 보여주고 싶은 custom message. 사전협의가 필요한 값	X	JSON Map 형태로 key, value 모두 String
        fetch("https://kapi.kakao.com/v1/payment/ready", {
          method: 'POST',
          credentials: 'include',
          mode:'no-cors',
          headers: {
            Authorization: auth,
          },
            body: form
          }).then(success => {
            alert(JSON.stringify(success));
            return resulte.complete('success');
          }, fail => {
            alert(JSON.stringify(fail));
            return resulte.complete('fail');
          }).catch(e => {
            alert(JSON.stringify(e));
            return resulte.complete('fail');
          });                
        }).then(success => {
          alert(JSON.stringify(success));
          return resulte.complete('success');
        }, fail => {
          alert(JSON.stringify(fail));
          return resulte.complete('fail');
        }); 
      } else {
        console.log("fail getting Token " + tokenKakao);
        Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: function(authObj) {
            alert(JSON.stringify(authObj));
            tokenKakao = Kakao.Auth.getAccessToken();
          },
          fail: function(err) {
            alert(JSON.stringify(err));
            return result.complete('fail');
          }
        });
        return result.complete('fail');
      }  
