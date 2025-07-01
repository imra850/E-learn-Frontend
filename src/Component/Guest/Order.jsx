import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getCourseById } from '../../services/Course.Service';
import { useParams } from 'react-router';
import { getPriceAfterDiscount } from './CourseView';
import { useAuth } from '../../Context/AuthContext';
import { Label } from 'flowbite-react';
import { Textarea } from 'flowbite-react';
import { Button } from 'flowbite-react';
import toast from 'react-hot-toast';
import { createOrder, verifyCoursePayment } from '../../services/Order.service';
import { BuisnessName, DESCRIPTION, razorPayKey } from '../../Config/constant';


const Order = () => {
    const { courseId } = useParams();
    const { isLogin, user } = useAuth();
    const [course, setCourse] = useState(null);
    const [address, setAddress] = useState("");

    async function getCourse() {
        const course = await getCourseById(courseId);
        console.log(course);
        setCourse(course);
      }
    
      useEffect(() => {
        getCourse();
      }, []);

      const handleCreateOrder=async ()=>{
        if(address.trim()==''){
            toast.error("Billing Address is Required");
        }

        const order={
            amount: getPriceAfterDiscount(course.price,course.discount),
            courseId:course.id,
            userId:user.id,
            userName: user.name,
            address: address
        }
        console.log(order);

        const orderResponse=await createOrder(order);
        console.log(orderResponse);
        toast.success("Order Created... Now Proceed to Payment");
        setTimeout(()=>{
          console.log(orderResponse.order.razorPayOrderId);
        },2000)
        

        var options = {
            "key": razorPayKey, // Enter the Key ID generated from the Dashboard
            "amount": getPriceAfterDiscount(course.price,course.discount)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": BuisnessName, //your business name
            "description": DESCRIPTION,
            "image": course.bannerUrl,
            "order_id": orderResponse.razorPayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);

                verifyPayment(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature);
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": user.name, //your customer's name
                "email": user.email,
                "contact": user.phoneNumber //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": address
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const rpy=new window.Razorpay(options);
        rpy.on('payment.failed', function (response){
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
    });

    rpy.open();

      }

      const verifyPayment=async (paymentId,orderId,signature)=>{
        try{
            const response=await verifyCoursePayment({
                razorPayPaymentId:paymentId,
                razorPayOrderId:orderId,
               
                razorPaySignature:signature
              })
              toast.success("all done.. Thank for Buying");
              console.log(response);
        } catch(error){
            toast.error("Error in Verifying Payment");
            console.log(error);
        }
      }
      const loadCheckOut=()=>{
          
        return new Promise((resolve,reject)=>{
            const script=document.createElement("script");
            script.id="razorpay_script";
            script.src="https://checkout.razorpay.com/v1/checkout.js"
            script.onload=()=>{
                resolve("Script loaded");
            }
            script.onerror=()=>{
                reject("Failed to load Script");
            }
            document.body.appendChild(script);
        })
      }

      useEffect(()=>{
          loadCheckOut();
      },[])
    
    return (
        <div className="flex dark:text-gray-200 gap-7 w-1/2 mx-auto mt-4 lg:mt-16 bg-gray-300 dark:bg-gray-700 rounded-lg p-6">
          <div className="flex w-full  justify-center  flex-col gap-3">
            <img
              className={"w-full  max-h-52 rounded object-cover"}
              src={course?.bannerUrl}
            />
    
            <p className="dark:text-gray-400">Course Information</p>
            <h1 className="font-bold text-xl">{course?.title}</h1>
            <p>{course?.shortDesc}</p>
            <p className="font-bold text-center text-4xl">
              ₹ {getPriceAfterDiscount(course?.price, course?.discount)}
            </p>
          </div>
          <div className="w-full flex  flex-col gap-3">
            <p className="dark:text-gray-400">Order Information</p>
            <h1 className="font-bold text-xl">{user?.name}</h1>
            <p>{user?.email}</p>
    
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Billing Address" />
              </div>
              <Textarea
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                value={address}
                id="address"
                placeholder="Enter your billing address"
                required
                rows={4}
              />
            </div>
            <Button onClick={handleCreateOrder}  color="indigo">
              Place Order
            </Button>
          </div>
        </div>
      );
}

export default Order