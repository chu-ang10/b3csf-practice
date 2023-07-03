package ibf2022.batch3.assessment.csf.orderbackend.controllers;

import java.util.Date;

import org.springframework.data.mongodb.core.aggregation.ArrayOperators.In;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.batch3.assessment.csf.orderbackend.models.PizzaOrder;

@RestController
@RequestMapping("/api")
public class OrderController {

	// TODO: Task 3 - POST /api/order

	@PostMapping(path = "api/order", consumes = "application/json")
    public ResponseEntity<String> placeOrder(@RequestBody String order) {
        
    }
    
    // Helper methods
    
    private void validateOrder(PizzaOrder order) throws Exception {
        // Implement your validation logic here
        // Throw an exception if the order is not valid
        
        if (order.getName() == null || order.getName().isEmpty()) {
            throw new Exception("Name is required");
        }
        
        if (order.getEmail() == null || order.getEmail().isEmpty()) {
            throw new Exception("Email is required");
        }
        
        // Add more validation rules as needed
    }
    
    private String generateOrderId() {
        // Implement your logic to generate an order ID
        return "12345";
    }
    
    private float calculateTotalPrice(PizzaOrder order) {
        // Implement your logic to calculate the total price of the order
        return 10.99f; // Example price
    }
}


	// TODO: Task 6 - GET /api/orders/<email>


	// TODO: Task 7 - DELETE /api/order/<orderId>

}
