type Pizza = {
    id: number;
    name: string;
    price: number;
};

type Order = {
    pizza: Pizza;
    status: "ordered" | "completed";
    orderID: number;
};

// Unique ID generators
let nextOrderID = 1;
let nextPizzaID = 1;

// Initial pizza menu
const menu: Pizza[] = [
    { id: nextPizzaID++, name: "Pepperoni", price: 10 },
    { id: nextPizzaID++, name: "Margherita", price: 8 },
    { id: nextPizzaID++, name: "Hawaiian", price: 10 },
    { id: nextPizzaID++, name: "Veggie", price: 9 },
];

// State variables
let cashInRegister = 100;
const orderQueue: Order[] = [];

// Function to add a new pizza to the menu
function addNewPizza(pizzaObj: Omit<Pizza, "id">): void {
    const newPizzaObj: Pizza = { id: nextPizzaID++, ...pizzaObj };
    menu.push(newPizzaObj);
}

// Generic function to add an item to an array
function addToArray<T>(array: T[], item: T): void {
    array.push(item);
}

// Adding initial pizzas
addToArray(menu, { id: nextPizzaID++, name: "Chocolate Lovers", price: 12 });
addToArray<Order>(orderQueue, { pizza: menu[2], status: "ordered", orderID: nextOrderID++ });

// Function to place an order
function placeOrder(pizzaName: string): Order {
    const selectedPizza = menu.find(pizza => pizza.name === pizzaName);
    
    if (!selectedPizza) {
        throw new Error(`Pizza with name ${pizzaName} not found`);
    }

    cashInRegister += selectedPizza.price;

    const newOrder: Order = { pizza: selectedPizza, status: "ordered", orderID: nextOrderID++ };
    orderQueue.push(newOrder);
    return newOrder;
}

// Function to complete an order
function completeOrder(orderID: number): Order {
    const order = orderQueue.find(order => order.orderID === orderID);

    if (!order) {
        throw new Error(`Order with ID ${orderID} not found`);
    }

    order.status = "completed";
    return order;
}

// Function to get pizza details by ID or name
function getPizzaDetail(identifier: string | number): Pizza | string {
    if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier) || `Pizza with id:${identifier} not found`;
    } else {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase()) || `Pizza with name:${identifier} not found`;
    }
}

// Adding more pizzas
addNewPizza({ name: "Meat Lovers", price: 12 });
addNewPizza({ name: "Cheese", price: 11 });

// Placing and completing an order
placeOrder("Margherita");
completeOrder(2);

// Output results
console.log(menu);
console.log(`\nCash In Register Amount: ${cashInRegister}\n`);
console.log(orderQueue);
console.log(getPizzaDetail("Veggie"));
