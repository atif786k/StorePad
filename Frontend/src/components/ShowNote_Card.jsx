import React from "react";
import "./style/style.css";

const ShowNote_Card = (props) => {
  return (
    <>
      <main className="show-note-card">
        <h1 className="show-note-card-title">
          {props.title ? props.title : "Prayer as an Anchor"}
        </h1>
        <p className="show-note-card-content">
          {props.description
            ? props.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni eaque, veritatis deleniti reiciendis quis nobis laborum, ex sint officia quibusdam molestias iure obcaecati rem, eveniet consectetur dolore. Animi est ex veritatis quaerat veniam enim eos ad vero, tempore, libero earum, dicta sit modi blanditiis distinctio ab quod architecto eaque et ipsam cupiditate. Necessitatibus nisi et, earum obcaecati asperiores at quod voluptatum, iusto eum perspiciatis eligendi beatae voluptate ipsum velit! Beatae repellat, rem voluptatum ea est vel, error quidem id dolor culpa earum amet quos cumque quod eaque eligendi pariatur cum, facere repellendus delectus unde ipsa voluptatem quam laborum! Consequatur."}
        </p>
        <h2>{props.createdDate}</h2>
      </main>
    </>
  );
};

export default ShowNote_Card;
