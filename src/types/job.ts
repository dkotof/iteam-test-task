export interface Job {
  employer_name: string;
  employer_logo?: string;
  employer_website?: string;
  employer_company_type?: string;
  job_publisher?: string;
  job_id: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_salary_currency?: string;
  job_salary_min?: number;
  job_salary_max?: number;
  job_salary_period?: string;
  job_highlights?: {
    Qualifications?: string[];
    Responsibilities?: string[];
    Benefits?: string[];
  };
  job_job_title?: string;
  job_posting_language?: string;
  job_required_skills?: string[];
  job_required_experience?: {
    no_experience_required?: boolean;
    required_experience_in_months?: number;
    experience_mentioned?: boolean;
    experience_preferred?: boolean;
  };
  job_required_education?: {
    postgraduate_degree?: boolean;
    professional_certification?: boolean;
    high_school?: boolean;
    associates_degree?: boolean;
    bachelors_degree?: boolean;
    degree_mentioned?: boolean;
    degree_preferred?: boolean;
    professional_certification_mentioned?: boolean;
  };
  job_experience_in_place_of_education?: boolean;
  job_min_salary?: number;
  job_max_salary?: number;
  job_posted_at_timestamp?: number;
  job_posted_at_datetime_utc?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  job_latitude?: number;
  job_longitude?: number;
  job_benefits?: string[];
  job_google_link?: string;
  job_offer_expiration_datetime_utc?: string;
  job_offer_expiration_timestamp?: number;
  job_required_skills_details?: Array<{
    skill: string;
    experience?: string;
  }>;
  job_skills?: string[];
  job_naics_code?: string;
  job_naics_name?: string;
} 