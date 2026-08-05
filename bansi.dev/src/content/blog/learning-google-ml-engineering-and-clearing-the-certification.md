---
title: "Learning Google ML Engineering and clearing the Certification"
description: "This blog is all about how to learn ML Engineering on Google Cloud Platform."
pubDate: 2023-02-12
tags: ['mlops']
---

This blog is all about how to learn ML Engineering on Google Cloud Platform.

**A little intro about MLOps or ML Engineering**  
As the name sounds ML and Engineering , both are two different things. Machine Learning is building the models based on the requirement and Engineering means how to bring it to life so that it can be part of solution it is built for. Now, as an ML Engineer, you are supposed to do both, since you are aware of the challenges in deploying the model, you will obviously have expertise on deciding the architecture of the model. Specifically “this works”, “this will not”. **So you are expected to have skills that of a Data Scientist as well as of a Devops Engineer**.

**Understand what’s the potential of Google Cloud Platform**

Google have been one of the major cloud players along with AWS and Azure. It has many services and solutions that help to build/migrate enterprise systems on GCP with minimal development work. One of which is Vertex AI , key offering of GCP for Machine Learning. There are many more scalable solutions for data streaming, messages , computes so on. You need to be thorough at least which suits where given the requirements providing best performance and low costs.  
Hey , but there are so many options for one SQL solution , how do I learn it in more clear and concise way. Although you have GCP Documentation, but this is the best I have seen so far, go through it, you will master GCP Services. Almost all companies have access to oreilly, please go through this nice book.

![](/images/medium/learning-google-ml-engineering-and-clearing-the-certification/01-0_cd92NX0t3--VKj2N.png)

**Visualizing Google Cloud — Priyanka Vergadia (Google Advocate)**  
[https://www.oreilly.com/library/view/visualizing-google-cloud/9781119816324/](https://www.oreilly.com/library/view/visualizing-google-cloud/9781119816324/)

**MLOps on Google Cloud — Vertex AI Pipelines Kubeflow** **Pipelines**

[Vertex AI](https://cloud.google.com/vertex-ai) is the offering from GCP which provides AI and ML Services. To summarize we can leverage Auto ML and Custom ML to build our ML solution. Auto ML is like a black box to us , but building Custom ML Models is like building deploying your own models. To achieve either of them in CI/CD environment , we need to build a pipeline , so that vertex ai knows what to do when triggered. Vertex AI Pipelines is basically [Kubeflow Pipelines](https://www.kubeflow.org/) ( Also by Google Engineers, but made open source) which is key part of ML Engineering Life Cycle. ( Data -> Train -> Validate -> Test -> Deploy)

**Learn Kubeflow Pipelines end to end** , on how it works, how do we construct , how do we pass data across components. MASTER IT. Official documentation itself is the best resource or you can find google docs link at the end.

Also , you are data scientist , if I come up with a problem with you , you need to give me a best solution that runs on GCP. (Using GCP Specifically)

**Simple Example : Generation of discount coupons based on user purchases**  
“ *Hey Bansi! , I have a supermarket where people order online most of the time , I have the purchase history and also the volumetrics of the purchases daily . I need to generate customized coupon during checkout so that they tend to spend more money. I don’t have any data center or so, I want everything done on cloud and I don’t want to spend too much on costs.*”  
Now as an ML Engineer , on a high level you need to enable many things :  
1\. ( **Re**) **Training** (Model Building ,Pipeline and Deployment)  
2\. **Inference** (Pipeline and Endpoint)  
3\. **Monitoring** with minimum(optimal) cost.  
4\. **Data Feed** (How do you connect and feed your data into your model?)

As an ML Engineer you should be able to assess and come up with a design using the best tools/configurations/services available in GCP to cater the requirement **end-to-end**. I hope now you understand the scope of ML Engineering or Google Cloud Professional ML Engineer ! 🙂

**Exam Experience**  
The exam is 120 mins long with 60 Questions. We cannot see the score, so no idea of correct or wrong answers it is either PASS or FAIL.  
I can say from the questions I have received :  
**1\. 50 % Use case based questions  
2\. 30 % Classic Machine Learning/ Deep Learning basics, techniques tools etc  
3\. 20 % Cost Saving Questions on GCP**

***Key Areas to Understand***  
**Data Engineering Capabilities** : Dataflow,Pub sub, Cloud Storage, Spanner, BigQuery **Compute Capabilities** : GKE , Virtual Machines  
**AI Capabilities** : Vertex AI — Pipelines, Auto ML , Workbench  
**Google In House Capabilities** : TensorFlow, TFX Pipelines

Resources for MLOps on GCP, the only best one !  
[https://cloud.google.com/blog/products/ai-machine-learning/getting-started-with-vertex-ai](https://cloud.google.com/blog/products/ai-machine-learning/getting-started-with-vertex-ai)

![](/images/medium/learning-google-ml-engineering-and-clearing-the-certification/02-0_Svk7gN22B1bBx16x.png)

*Originally published at* [*http://bansidath.com*](https://bansidath.com/2023/02/12/%cc%b6p%cc%b6a%cc%b6s%cc%b6s%cc%b6i%cc%b6n%cc%b6g%cc%b6-learning-google-ml-engineering-and-clearing-the-certification/) *on February 12, 2023.*

---

*Originally published on [Medium](https://medium.com/@bansimaddali/learning-google-ml-engineering-and-clearing-the-certification-3783fac82d72).*
