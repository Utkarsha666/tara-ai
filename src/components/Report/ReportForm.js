import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import GradientButton from "../common/Button";

// Grouped Topics (for better readability)
const groupedTopics = [
  {
    group: "Gender Equality & Empowerment",
    topics: [
      "Empowering Women in Leadership for Climate Action",
      "Building Gender-Equitable Decision-Making in Disaster Response",
      "Strengthening Women's Roles in Sustainable Development Initiatives",
      "Creating Platforms for Women in Tech to Address Climate Change",
      "Promoting Gender-Equitable Access to Climate Financing",
      "Enhancing Women's Capacity for Climate Change Mitigation",
      "Gender Equality in Community-Based Renewable Energy Solutions",
    ],
  },
  {
    group: "Climate Change Adaptation Strategies",
    topics: [
      "AI-Driven Climate Resilience Solutions for Vulnerable Populations",
      "Climate Change and Its Impact on Food Security in Developing Countries",
      "Innovative Climate-Resilient Agricultural Practices for Rural Communities",
      "Smart Water Management Solutions for Climate-Impacted Regions",
      "Enhancing Urban Climate Resilience with AI and Big Data",
      "Reducing Climate Risks Through Smart Infrastructure Development",
      "Innovative Technologies for Climate Change Mitigation in Small Island Nations",
    ],
  },
  {
    group: "Gender & Climate Change",
    topics: [
      "Integrating Gender-Responsive Climate Change Mitigation Strategies",
      "The Role of Women in Shaping Sustainable Urban Development Amid Climate Change",
      "Gender-Sensitive Disaster Risk Reduction and Climate Adaptation",
      "Creating Gender-Inclusive Climate Action Plans for National Governments",
      "Women in Renewable Energy: Reducing Barriers to Participation",
      "Gender and the Transition to a Green Economy: Challenges and Opportunities",
      "Women as Catalysts for Climate Change Innovation and Resilience",
    ],
  },
  {
    group: "Climate Change & Education",
    topics: [
      "Leveraging AI for Climate Change Education in Underserved Communities",
      "Creating Climate Change Awareness Programs for School Children",
      "Educating Future Leaders: Climate Change in Higher Education Curricula",
      "AI for Developing Climate Resilience Programs in Remote Schools",
      "Building Climate Literacy Through Virtual Learning Platforms",
      "Incorporating Climate Change into STEM Education Programs",
      "Gender-Inclusive Education on Climate Action and Sustainability",
    ],
  },
  {
    group: "Disaster Risk Reduction & Climate Resilience",
    topics: [
      "AI-Powered Early Warning Systems for Climate-Driven Disasters",
      "Building Climate Resilience in Vulnerable Communities Using Technology",
      "Disaster Preparedness Programs for Women and Girls in Climate-Affected Areas",
      "Innovative Solutions for Climate-Induced Migration",
      "Promoting Climate Resilience in Urban Informal Settlements",
      "The Role of Technology in Enhancing Community Resilience to Climate Change",
      "AI-Assisted Disaster Recovery for Marginalized Populations",
    ],
  },
  {
    group: "Agriculture & Climate Change",
    topics: [
      "Climate-Smart Agriculture: AI-Driven Solutions for Smallholder Farmers",
      "Developing Climate-Resilient Crops Using Genetic Engineering",
      "Empowering Women Farmers with Climate-Smart Agriculture Solutions",
      "Using AI to Optimize Water Use in Agriculture Amid Climate Change",
      "AI Solutions for Sustainable Land Management and Crop Rotation",
      "Promoting Agri-Tech Startups Focused on Climate Change Adaptation",
      "Building Climate Resilience in Agricultural Supply Chains",
    ],
  },
  {
    group: "Water Security & Sanitation",
    topics: [
      "AI for Improving Water Access in Drought-Affected Areas",
      "Climate-Resilient Water Management Systems for Rural Communities",
      "Developing Sustainable Sanitation Solutions in Climate-Affected Areas",
      "Technology-Driven Approaches to Addressing Water Scarcity Amid Climate Change",
      "Gender-Inclusive Water Governance and Climate Action",
      "Creating Smart Water Networks for Climate Change Adaptation",
      "Innovative Water Recycling and Reuse Solutions for Climate Resilience",
    ],
  },
  {
    group: "Green Jobs & Gender",
    topics: [
      "Creating Green Jobs for Women in Renewable Energy Industries",
      "Gender-Inclusive Approaches to Scaling Up the Green Economy",
      "Empowering Women Through Green Entrepreneurship in Rural Areas",
      "Training Women in Climate-Smart Agriculture and Renewable Energy",
      "Opportunities for Women in Climate-Resilient Construction and Infrastructure",
      "Developing Gender-Equitable Green Job Opportunities in Urban Areas",
      "Promoting Women’s Involvement in Circular Economy Initiatives",
    ],
  },
  {
    group: "Sexual & Reproductive Health & Climate Change",
    topics: [
      "Addressing the Impact of Climate Change on Maternal Health",
      "Climate Change and Its Influence on Reproductive Health in Vulnerable Regions",
      "Building Health Systems Resilient to Climate Change and Gendered Impact",
      "Integrating Family Planning Services in Climate Adaptation Programs",
      "AI Solutions for Enhancing Access to Sexual and Reproductive Health in Climate-Affected Areas",
      "The Intersection of Climate Change and Gender-Based Violence in Health Systems",
      "Empowering Women with Knowledge on Sexual and Reproductive Health Amid Climate Disasters",
    ],
  },
  {
    group: "Climate-Smart Urbanization",
    topics: [
      "Smart Cities and Their Role in Climate Change Mitigation",
      "AI-Powered Urban Planning for Climate Resilience",
      "Building Climate-Smart Infrastructure for Growing Urban Populations",
      "Green Building Technologies for Urban Climate Adaptation",
      "Sustainable Public Transport Systems for Climate-Smart Cities",
      "Gender-Inclusive Urban Climate Action Plans",
      "Leveraging Technology for Sustainable Urban Food Systems",
    ],
  },
  {
    group: "Technology & Innovation for Climate Action",
    topics: [
      "AI and Machine Learning Solutions for Climate Change Modeling",
      "Innovative Climate Monitoring Technologies for Data-Driven Decisions",
      "Blockchain for Transparent Climate Action Financing",
      "IoT Solutions for Smart Climate Monitoring in Remote Areas",
      "Harnessing Big Data for Predicting and Addressing Climate Change Impacts",
      "Innovations in Carbon Capture and Storage Technology",
      "The Role of Digital Technologies in Climate Change Education and Advocacy",
    ],
  },
  {
    group: "Sustainable Energy & Climate Change",
    topics: [
      "Advancing Solar Power Solutions for Climate Change Mitigation",
      "Wind and Solar Energy Solutions for Rural and Remote Areas",
      "AI for Energy-Efficient Building Design in Climate-Affected Regions",
      "Energy Access for Women in Off-Grid and Rural Communities",
      "Promoting Green Hydrogen as a Sustainable Energy Source",
      "Sustainable Energy Storage Solutions for Climate Resilience",
      "Creating Smart Energy Grids for Climate-Smart Communities",
    ],
  },
  {
    group: "Sustainable Fashion & Climate Action",
    topics: [
      "Sustainable Fashion Innovations to Reduce Carbon Footprint",
      "Promoting Gender-Equitable Practices in the Fashion Industry",
      "AI Solutions for Tracking Carbon Footprints in Fashion Supply Chains",
      "Climate-Resilient Textile Manufacturing Solutions",
      "Building a Circular Economy in the Fashion Industry",
      "Empowering Women in the Fashion Sector to Lead Climate Action",
      "Green Design and Sustainability in the Fashion Industry",
    ],
  },
  {
    group: "Climate Finance & Investment",
    topics: [
      "Innovative Climate Finance Mechanisms for Gender-Sensitive Projects",
      "Investing in Climate Resilience: Opportunities for Gender-Inclusive Funding",
      "Blockchain for Transparent and Efficient Climate Finance Distribution",
      "Building Investment Portfolios Focused on Climate Adaptation and Sustainability",
      "Microfinance for Climate-Smart Projects in Developing Economies",
      "Creating Green Investment Funds for Women Entrepreneurs in Climate Solutions",
      "Innovative Insurance Models for Climate Risk and Gender Equity",
    ],
  },
  {
    group: "Climate Data & Gender Equality",
    topics: [
      "Collecting and Analyzing Gender-Sensitive Climate Data for Policy-Making",
      "AI-Powered Tools for Monitoring Gendered Impacts of Climate Change",
      "Building Gender-Specific Climate Risk Assessments Using Data Science",
      "Gender-Disaggregated Climate Data: Enhancing Resilience in Vulnerable Populations",
      "Integrating Climate Data with Gender-Sensitive Decision Making",
      "Building Inclusive Climate Data Systems for Gender and Social Equity",
    ],
  },
  {
    group: "Food Security & Climate Resilience",
    topics: [
      "AI-Driven Solutions for Climate-Resilient Food Systems",
      "Gender-Sensitive Approaches to Addressing Climate-Induced Hunger",
      "Innovative Practices in Climate-Smart Food Security for Vulnerable Regions",
      "Sustainable Agricultural Practices to Combat Climate-Induced Food Insecurity",
      "Using Technology to Improve Food Distribution in Climate-Impacted Areas",
      "Empowering Women Farmers for Climate-Resilient Food Security",
    ],
  },
  {
    group: "Inclusive Climate Governance",
    topics: [
      "Building Inclusive Climate Governance Systems that Address Gender and Social Equity",
      "The Role of Women in Climate Governance and Global Climate Agreements",
      "Promoting Public Participation in Climate Decision-Making Processes",
      "AI Solutions for Ensuring Gender Inclusivity in Climate Policy Development",
      "Strengthening Local Governance for Climate Adaptation and Resilience",
      "Gender-Sensitive Approaches to International Climate Cooperation",
    ],
  },
  {
    group: "Funding Opportunities",
    topics: [
      "Funding Opportunities for Gender Equality and Empowerment",
      "Climate Change Adaptation Funding Sources",
      "Donor-Funded Climate Resilience Initiatives",
      "Funding for AI and Technology Solutions in Climate Change",
      "Green Financing for Sustainable Energy Projects",
      "Climate Finance for Disaster Risk Reduction Programs",
      "Funding Mechanisms for Climate-Smart Agriculture",
    ],
  },
  {
    group: "Donors",
    topics: [
      "Donors Supporting Gender Equality and Climate Change Projects",
      "Major Climate-Focused Donors and Foundations",
      "Donors Financing Disaster Risk Reduction and Resilience Building",
      "International Donors Supporting Climate Education and Awareness",
      "Philanthropic Organizations Supporting Green Energy Transitions",
      "Donor Networks for Funding Women-Led Climate Initiatives",
      "Public and Private Sector Partnerships in Climate Financing",
    ],
  },
];

const ReportForm = ({
  topic,
  setTopic,
  maxAnalysts,
  setMaxAnalysts,
  handleGenerateReport,
  loadingReportGeneration,
  loadingReports,
}) => {
  const handleSelectChange = (e) => {
    console.log("Selected Topic: ", e.target.value);
    setTopic(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginBottom: 4,
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.02)",
        },
      }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel>Topic</InputLabel>
        <Select value={topic} onChange={handleSelectChange}>
          <MenuItem value="" disabled>
            Select a Topic
          </MenuItem>

          {/* Render grouped topics */}
          {groupedTopics.map((group, groupIndex) => [
            // Group Title
            <MenuItem key={`${groupIndex}-group`} disabled>
              {group.group}
            </MenuItem>,
            // Render each topic in the group
            ...group.topics.map((t, index) => (
              <MenuItem key={`${groupIndex}-${index}`} value={t}>
                {t}
              </MenuItem>
            )),
            // Optional divider between groups
            groupIndex < groupedTopics.length - 1 && (
              <Divider key={`${groupIndex}-divider`} />
            ),
          ])}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Max Analysts"
        value={maxAnalysts}
        onChange={(e) => setMaxAnalysts(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
      />

      {/* Use the GradientButton here */}
      <GradientButton
        onClick={handleGenerateReport}
        disabled={loadingReportGeneration || loadingReports}
      >
        Generate Report
      </GradientButton>

      {/* Show loading spinner and message when report is being generated */}
      {loadingReportGeneration && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 2,
          }}
        >
          <CircularProgress />
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Generating Report... It may take some time.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportForm;
