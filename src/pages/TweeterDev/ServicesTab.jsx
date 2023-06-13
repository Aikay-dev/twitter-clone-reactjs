import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

function ServicesTab() {
  return (
    <section className="p-3 pb-60">
      <p className="text-xl homelabelcolor">Freelance Services</p>
      <p className="mt-3">
        "Hey there!👋 I offer a diverse range of freelance web development
        services designed to elevate your online presence. With my expertise and
        passion for web development, I am dedicated to delivering exceptional
        results that exceed your expectations."
      </p>
      <div>
        <p className="mt-3 font-semibold mb-3">WEB DEVELOPMENT</p>
        <FontAwesomeIcon icon="fa-solid fa-code" />
        <div>
          "I offer freelance web development services, creating visually
          appealing and user-friendly websites. With expertise in front-end
          development, I build captivating interfaces that showcase your brand
          and provide seamless experiences."
        </div>
        <div className="flex flex-row-reverse">
          <FontAwesomeIcon icon="fa-solid fa-code" />
        </div>
      </div>
      <div>
        <p className="mt-3 font-semibold mb-3">APP DEVELOPMENT</p>
        <FontAwesomeIcon icon="fa-solid fa-code" />
        <div>
          " As a freelance app developer, I specialize in crafting visually
          captivating and intuitive mobile applications. With extensive
          experience in app development, I create user-friendly interfaces that
          embody your brand's essence and provide seamless interactions."
        </div>
        <div className="flex flex-row-reverse">
          <FontAwesomeIcon icon="fa-solid fa-code" />
        </div>
      </div>
      <div>
        <p className="mt-3 font-semibold mb-3">WEB DESIGNING</p>
        <FontAwesomeIcon icon="fa-solid fa-code" />
        <div>
          "Using the latest web design techniques and industry best practices, I
          craft engaging user interfaces that seamlessly guide visitors through
          your website. From typography and color schemes to layout and
          navigation, every element is thoughtfully chosen to create a cohesive
          and impactful design."
        </div>
        <div className="flex flex-row-reverse">
          <FontAwesomeIcon icon="fa-solid fa-code" />
        </div>
      </div>
    </section>
  );
}

export default ServicesTab;
