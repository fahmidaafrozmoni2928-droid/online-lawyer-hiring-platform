


export default function Card ({lawyer}) {
    return(
        <div className="mx-auto">
            <div className="p-4 rounded-lg shadow-sm bg-base-100">
                
          <img
            src={lawyer.photo}
            alt={lawyer.name}
            className="w-full h-64 object-cover rounded"
          />

          <h2 className="text-xl font-bold mt-3">
            {lawyer.name}
          </h2>

          <p>Spacialization:{lawyer.specialization}</p>
          <p>Consultation Fee:{lawyer.consultationFee}</p>
          <p>Status:{lawyer.status}</p>
        </div> 
        </div>
    )
}