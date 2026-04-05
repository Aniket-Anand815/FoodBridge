def predict_eta(distance, traffic):

    base_speed = 40

    traffic_factor = {
        "low":1,
        "medium":1.4,
        "high":1.8
    }

    eta = (distance / base_speed) * 60 * traffic_factor.get(traffic,1)

    return round(eta)