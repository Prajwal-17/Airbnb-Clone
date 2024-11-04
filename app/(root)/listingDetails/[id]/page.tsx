// "use client"

// import { useEffect } from "react";

// export default function ListingDetails({ params }: {
//   params: { id: string }
// }) {

//   const id = params.id;

//   useEffect(() => {
//     const fetchListingDetails = async () => {
//       try {
//         const listing = await fetch(`http://localhost:3000/api/listingDetails/${id}`)
//       } catch (error) {
//         console.log(error)
//       }
//     }

//     fetchListingDetails();
//   }, [id])

//   return (<>
//     <div>listing details page </div>

//   </>)
// }