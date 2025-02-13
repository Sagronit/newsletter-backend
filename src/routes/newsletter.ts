import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";
import { Subscriber } from "../models/subscriber";

export const newsletter = new Hono();

newsletter.get("/", async (c) => {
  const newsletters = await Newsletter.findAll();

  return c.json(
    {
      data: newsletters,
    },
    200
  );
});

newsletter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const newsletters = await Newsletter.find(id);

  return c.json(
    {
      data: newsletters,
    },
    200
  );
});

newsletter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedNewsletter = await Newsletter.update(id, body);
    if (updatedNewsletter) {
      return c.json(
        { message: "Subscirber updated successfully", data: updatedNewsletter },
        200
      );
    } else {
      return c.text("Subscriber not foud or Update failed", 404);
    }
  } catch (error) {
    console.error(" Error updating subscriber:", error);
    return c.text("Internal server error", 500);
  }
});

newsletter.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const updatedNewsletter = await Newsletter.create(body);

    if (updatedNewsletter) {
      return c.json(
        { message: "newsletter created Succesfully", data: updatedNewsletter },
        201
      );
    } else {
      return c.text("newsletter not created.", 404);
    }
  } catch (error) {
    console.error("Error updating newsletter", error);
    return c.text("Internal server error", 500);
  }
});
