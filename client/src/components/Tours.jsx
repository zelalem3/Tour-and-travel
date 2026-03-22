import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom"; // Added this
import "./tours.css";
import { client, urlFor } from '../sanityClient'; 




const Tours = () => {

    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const query = '*[_type == "tour"] | order(_createdAt asc)';
    client.fetch(query)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

   if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>Loading Tours...</div>
      </div>
    );
  }

  

  return (
    <section id="tours">
      <div className="max-w-7xl mx-auto px-6">
        <header className="section-header">
          <h2 className="title">
            Our Most Popular <span>Tours</span>
          </h2>
          <div className="underline"></div>
        </header>

        <div className="grid-container">
          {tours.map((tour, index) => (
            <div key={index} className="card flex flex-col">
              {/* Badge */}
              {index === 0 && (
                <div className="badge badge-secondary absolute top-4 right-4 z-10">
                  Popular
                </div>
              )}

              <figure className="overflow-hidden">
                <img
                  src={urlFor(tour.mainImage).width(600).height(400).url()}
                  alt={tour.name}
                  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </figure>

              <div className="card-body flex flex-col flex-grow p-6">
                <h2 className="card-title text-xl font-bold mb-2">
                  {tour.name}
                </h2>

                <p className="text-sm text-gray-500 flex-grow mb-4">
                  {tour.description}
                </p>

                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  ⏳ {tour.duration} • Guided Tour
                </p>

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <span className="text-blue-700 font-black text-2xl">
                    {tour.price}
                  </span>

                  <button
                    className="btn btn-primary btn-md shadow-md"
                    onClick={() =>
                      navigate("/contact", {
                        state: { tour: tour.name },
                      })
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;