package ibf2022.batch3.assessment.csf.orderbackend.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.batch3.assessment.csf.orderbackend.models.PizzaOrder;
import ibf2022.batch3.assessment.csf.orderbackend.respositories.OrdersRepository;
import ibf2022.batch3.assessment.csf.orderbackend.respositories.PendingOrdersRepository;

public class OrderingService {

	@Autowired
	private OrdersRepository ordersRepo;

	@Autowired
	private PendingOrdersRepository pendingOrdersRepo;

	@Value("${pizza.api.url}")
	private String pizzaApiUrl;

	// TODO: Task 5
	// WARNING: DO NOT CHANGE THE METHOD'S SIGNATURE
	public PizzaOrder placeOrder(PizzaOrder order) throws OrderException {

		RestTemplate restTemplate = new RestTemplate();
		MultiValueMap<String, String> pizzaOrder = new LinkedMultiValueMap<>();
		pizzaOrder.add("name", order.getName());
		pizzaOrder.add("email", order.getEmail());
		pizzaOrder.add("sauce", order.getSauce());
		pizzaOrder.add("size", String.valueOf(order.getSize()));
		pizzaOrder.add("thickCrust", String.valueOf(order.getThickCrust()));
		pizzaOrder.add("toppings", String.valueOf(order.getTopplings()));
		pizzaOrder.add("comments", order.getComments());


    RequestEntity<MultiValueMap<String, String>> req = RequestEntity
	.post(pizzaApiUrl)
	.contentType(MediaType.APPLICATION_FORM_URLENCODED)
	.body(pizzaOrder);

	ResponseEntity<String> resp = restTemplate.exchange(req, String.class);

	String[] resultArr = resp.getBody().split(",");
	String OrderId = resultArr[0];
	Long epochDate = Long.parseLong(resultArr[1]);
	Date orderDate = new Date(epochDate);
	Float total = Float.parseFloat(resultArr[2]);

	order.setOrderId(OrderId);
	order.setDate(orderDate);
	order.setTotal(total);

	//save to mongo
	ordersRepo.add(order);

	//save to redis
	pendingOrdersRepo.add(order);

	return order;
	
	}

	

	// For Task 6
	// WARNING: Do not change the method's signature or its implemenation
	public List<PizzaOrder> getPendingOrdersByEmail(String email) {
		return ordersRepo.getPendingOrdersByEmail(email);
	}

	// For Task 7
	// WARNING: Do not change the method's signature or its implemenation
	public boolean markOrderDelivered(String orderId) {
		return ordersRepo.markOrderDelivered(orderId) && pendingOrdersRepo.delete(orderId);
	}

}
