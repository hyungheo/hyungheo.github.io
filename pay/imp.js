      IMP.request_pay({
        pg : 'html5_inicis',
        pay_method : 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : '헐형:결제테스트',
        amount : details.total.amount.value,
        buyer_email : paymentData.payerEmail,
        buyer_name : paymentData.details.cardholderName,
        buyer_tel : paymentData.details.phone,
        buyer_addr : paymentData.shippingAddress,
        buyer_postcode : paymentData.postalCode
      }, function(rsp) {
        if ( rsp.success ) {
          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
        }
        alert(msg);
      });
